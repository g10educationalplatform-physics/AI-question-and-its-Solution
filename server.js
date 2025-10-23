// server.js
import 'dotenv/config';
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

const PORT = process.env.PORT || 3000;

// Ensure API key exists
if (!process.env.OPENAI_API_KEY) {
  console.error("ERROR: OPENAI_API_KEY is not set. Set it in your environment (Render) or .env (local).");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

// Serve static frontend from /public
const publicDir = path.resolve("./public");
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  console.log("Serving static files from /public");
} else {
  console.warn("Warning: public directory not found. No static files will be served.");
}

app.use(cors()); // in production, restrict origin: cors({ origin: "https://your-domain" })
app.use(express.json());

// Load local JSON question banks (with error handling)
const subjects = ["physics", "chemistry", "math", "biology"];
const data = {};

for (const subj of subjects) {
  try {
    const filePath = path.resolve(`./data/${subj}.json`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      data[subj] = JSON.parse(raw);
      console.log(`Loaded ${subj} (${Array.isArray(data[subj]) ? data[subj].length : "unknown"} entries)`);
    } else {
      console.warn(`Warning: ./data/${subj}.json not found — ${subj} endpoint will return 404.`);
      data[subj] = null;
    }
  } catch (err) {
    console.error(`Failed to load ./data/${subj}.json:`, err.message);
    data[subj] = null;
  }
}

// Serve question banks
for (const subj of subjects) {
  app.get(`/${subj}`, (req, res) => {
    if (!data[subj]) return res.status(404).json({ error: `${subj} data not found` });
    res.json(data[subj]);
  });
}

// AI endpoint with robust streaming & keepalive
app.post("/ask-ai", async (req, res) => {
  let keepAliveTimer = null;
  let openaiStream = null;
  let clientClosed = false;

  try {
    const question = (req.body?.question || "").toString().trim();
    if (!question) return res.status(400).json({ error: "No question provided" });

    // Required headers for streaming text
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");

    // Immediately send headers
    if (typeof res.flushHeaders === "function") res.flushHeaders();

    // Heartbeat: send a single space every 15s to keep connection alive on proxies/platforms
    keepAliveTimer = setInterval(() => {
      try {
        // Minimal heartbeat
        res.write(" ");
      } catch (e) {
        // ignore write errors here; 'close' event will handle cleanup
      }
    }, 15000);

    // If client disconnects, mark and attempt to close upstream stream
    req.on("close", () => {
      clientClosed = true;
      clearInterval(keepAliveTimer);
      try {
        if (openaiStream && typeof openaiStream.return === "function") openaiStream.return();
      } catch (e) {
        // ignore
      }
    });

    // Create streaming completion from OpenAI
    openaiStream = await client.chat.completions.create({
      model: "gpt-4o-mini",      // keep your chosen model
      stream: true,
      messages: [
        {
          role: "system",
          content: "You are an expert tutor in Physics, Chemistry, Math, and Biology. Show clear step-by-step reasoning and use LaTeX where appropriate."
        },
        { role: "user", content: `Solve this question clearly, step-by-step:\n${question}` }
      ],
      max_tokens: 1500,
    });

    // Iterate over stream and write chunks to response
    for await (const chunk of openaiStream) {
      if (clientClosed) break;

      // Chunk shapes vary by SDK / version. handle common shapes.
      const delta =
        (chunk?.choices?.[0]?.delta?.content) ??
        (chunk?.choices?.[0]?.text) ??
        (chunk?.text) ??
        null;

      if (delta) {
        try {
          res.write(delta);
        } catch (e) {
          // If write fails, break the loop and cleanup
          break;
        }
      }
    }

    // End of stream: clear heartbeat and close response
    clearInterval(keepAliveTimer);
    try { res.end(); } catch (e) { /* ignore */ }
  } catch (err) {
    // Log the full error
    console.error("AI stream error:", err);

    clearInterval(keepAliveTimer);

    // If it's a rate-limit error from OpenAI, provide a helpful message
    const isRateLimit = err?.code === "rate_limit_exceeded" || (err?.status === 429);

    if (!res.headersSent) {
      if (isRateLimit) {
        return res.status(429).send("⚠️ OpenAI rate limit reached. Please try again later or add billing to your OpenAI account.");
      }
      return res.status(500).json({ error: "Streaming failed", details: err?.message || String(err) });
    }

    // If headers already sent, try to write an inline message and end
    try {
      if (isRateLimit) {
        res.write("\n\n⚠️ OpenAI rate limit reached. Please try again later.\n");
      } else {
        res.write("\n\n[Error: streaming failed]\n");
      }
      res.end();
    } catch (e) {
      // nothing more to do
    }
  }
});


// Health-check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Root fallback (static index.html if present)
app.get("/", (req, res) => {
  const indexPath = path.join(publicDir, "index.html");
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.send("✅ AI Question Solver API is running. Use /ask-ai to POST questions.");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
