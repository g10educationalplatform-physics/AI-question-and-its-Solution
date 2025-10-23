// server.js
import 'dotenv/config';
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

const PORT = process.env.PORT || 3000;

if (!process.env.OPENAI_API_KEY) {
  console.error("ERROR: OPENAI_API_KEY is not set.");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

// Serve static frontend from /public if present
const publicDir = path.resolve("./public");
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  console.log("Serving static files from /public");
} else {
  console.warn("Warning: public directory not found. No static files will be served.");
}

app.use(cors());
app.use(express.json());

// Load data files for question banks (optional)
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
      data[subj] = null;
      console.warn(`./data/${subj}.json not found — ${subj} endpoint will return 404.`);
    }
  } catch (err) {
    console.error(`Failed to load ./data/${subj}.json:`, err.message);
    data[subj] = null;
  }
}
for (const subj of subjects) {
  app.get(`/${subj}`, (req, res) => {
    if (!data[subj]) return res.status(404).json({ error: `${subj} data not found` });
    res.json(data[subj]);
  });
}

// ---------- Streaming endpoint ----------
app.post("/ask-ai", async (req, res) => {
  let keepAliveTimer = null;
  let openaiStream = null;

  try {
    const question = (req.body?.question || "").toString().trim();
    if (!question) return res.status(400).json({ error: "No question provided" });

    // Required headers for streaming text
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");

    // Immediately send headers
    res.flushHeaders();

    // Heartbeat: send a single space every 15s to keep connection alive on proxies/platforms
    keepAliveTimer = setInterval(() => {
      try {
        // Small heartbeat; keep it minimal to avoid altering output semantics
        res.write(" ");
      } catch (e) {
        // ignore write errors here; the 'close' event will handle cleanup
      }
    }, 15000);

    // Create streaming completion from OpenAI
    openaiStream = await client.chat.completions.create({
      model: "gpt-4o-mini",      // keep your chosen model here
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

    // If client aborts (closes connection), stop streaming from OpenAI
    req.on("close", () => {
      clearInterval(keepAliveTimer);
      // Some stream objects expose return() or break methods; attempt to close if available.
      try {
        if (openaiStream && typeof openaiStream.return === "function") openaiStream.return();
      } catch (e) { /* ignore */ }
    });

    // Iterate over stream and write chunks to response
    for await (const chunk of openaiStream) {
      // SDK chunk shape may vary; check commonly available fields
      const delta = chunk?.choices?.[0]?.delta?.content ?? chunk?.choices?.[0]?.delta?.content ?? chunk?.choices?.[0]?.text ?? null;
      if (delta) {
        res.write(delta);
      }
    }

    // End of stream: clear heartbeat and close response
    clearInterval(keepAliveTimer);
    res.end();
  } catch (err) {
    console.error("AI stream error:", err);
    clearInterval(keepAliveTimer);

    // If headers not sent yet, send a JSON error
    if (!res.headersSent) {
      return res.status(500).json({ error: "Streaming failed", details: err.message });
    }

    // If headers already sent, try to write a short error message then end
    try {
      res.write("\n\n[Error: streaming failed]\n");
      res.end();
    } catch (e) {
      // nothing we can do
    }
  }
});

// Health-check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Root fallback
app.get("/", (req, res) => {
  const indexPath = path.join(publicDir, "index.html");
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
  res.send("✅ AI Question Solver API is running. Use /ask-ai to POST questions.");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
