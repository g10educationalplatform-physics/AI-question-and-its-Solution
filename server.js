<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Secure Learning Platform</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
*{box-sizing:border-box}
body{margin:0;background:#eef2f7;font-family:Arial,sans-serif}

/* LOGIN */
.login-container{display:flex;justify-content:center;align-items:center;height:100vh}
.card{background:#fff;padding:25px;width:340px;border-radius:12px;box-shadow:0 10px 25px rgba(0,0,0,.15);text-align:center}
input,button{width:100%;padding:12px;margin:8px 0;font-size:16px}
button{background:#4f46e5;color:#fff;border:none;border-radius:6px;cursor:pointer}
button:hover{opacity:.9}
.hidden{display:none}
.msg{color:red;font-size:14px}

/* MENU */
#menuScreen{display:none;min-height:100vh;padding:15px}
.menuBox{
  width:90%;
  max-width:1300px;
  margin:auto;
  background:#fff;
  padding:20px;
  border-radius:12px;
  box-shadow:0 10px 25px rgba(0,0,0,.15)
}
.menuBox h2{text-align:center}

/* ACCORDION */
.acc-btn,.sub-btn{background:#1e293b;color:#fff;padding:12px;border:none;width:100%;border-radius:8px;margin:6px 0;font-size:16px;text-align:left;cursor:pointer}
.sub-btn{background:#475569}
.acc-content{display:none;padding-left:8px;margin-top:6px}

.chapter{background:#e5e7eb;padding:10px;border-radius:6px;margin:6px 0}
.resource-row{display:flex;gap:8px;margin-top:6px}
.resource-row button{flex:1;padding:8px;font-size:14px}
.resource-row button:nth-child(1){background:#10b981}
.resource-row button:nth-child(2){background:#6366f1}
.resource-row button:nth-child(3){background:#f59e0b}

/* FULLSCREEN PPT */
#frameContainer{display:none;position:fixed;inset:0;background:#000;z-index:999}
#frameContainer iframe{width:100vw;height:100vh;border:none}

/* FLOAT BUTTONS */
.float-btn{
  position:fixed;
  z-index:1000;
  width:38px !important;
  height:38px !important;
  font-size:18px;
  background:rgba(0,0,0,0.55);
  color:#fff;
  border:none;
  border-radius:50%;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 2px 8px rgba(0,0,0,0.4);
  transition:0.2s;
}
.float-btn:hover{background:rgba(0,0,0,0.8);transform:scale(1.05)}


/* ACTIVE PEN GLOW */
.pen-active{
  background:#22c55e !important;
  box-shadow:0 0 12px rgba(34,197,94,0.9);
  transform:scale(1.1);
}




#backBtn{top:10px;right:10px}
#logoutBtn{bottom:10px;right:10px;background:rgba(239,68,68,0.85)}

/* DRAW CANVAS */
#drawCanvas{
  position:fixed;
  inset:0;
  z-index:900;
  display:none;
  background:transparent;
}

/* DRAW TOOL BUTTONS */
#penBtn{top:60px;right:10px}
#eraserBtn{top:110px;right:10px}
#clearBtn{top:160px;right:10px}



/* COLOR TRAY */
#colorTray{
  position:fixed;
  top:210px;
  right:10px;
  display:flex;
  flex-direction:column;
  gap:6px;
  z-index:1000;
}

#colorTray span{
  width:22px;
  height:22px;
  border-radius:50%;
  cursor:pointer;
  border:2px solid #fff;
  box-shadow:0 0 4px rgba(0,0,0,0.6);
}




#plusBtn{top:210px;right:70px}
#minusBtn{top:260px;right:70px}



#sizeLabel{
  position:fixed;
  top:218px;
  right:108px;
  color:#fff;
  font-size:13px;
  font-weight:600;
  z-index:1000;
  pointer-events:none;
  text-shadow:0 0 4px rgba(0,0,0,0.9);
}





#timerBox{
  position:fixed;
  top:10px;
  left:10px;
  padding:6px 12px;
  background:rgba(0,0,0,0.6);
  color:#fff;
  font-size:14px;
  font-weight:600;
  border-radius:8px;
  z-index:1000;
  letter-spacing:1px;
  box-shadow:0 0 6px rgba(0,0,0,0.6);
}



#whiteboardWindow{
  position:fixed;
  top:10px;
  bottom:40px;
  left:10%;
  right:10%;
  background:#fff;
  border-radius:12px;
  z-index:2000;
  display:none;
  box-shadow:0 0 30px rgba(0,0,0,0.7);
}


#whiteboardHeader{
  height:40px;
  background:#111;
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 14px;
  border-radius:12px 12px 0 0;
  font-size:15px;
}

#whiteboardHeader span{
  cursor:pointer;
  font-size:18px;
}

#whiteboardCanvas{
  width:100%;
  height:calc(100% - 40px);
  touch-action: none;
  display:block;
}


/* PERIODIC TABLE WINDOW */

#ptableWindow{
  position:fixed;
  inset:20px;
  background:#fff;
  border-radius:14px;
  z-index:3000;
  display:none;
  box-shadow:0 0 35px rgba(0,0,0,0.8);
  overflow:hidden;
}

#ptableHeader{
  height:42px;
  background:#111;
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 15px;
  font-size:15px;
  font-weight:600;
}

#ptableHeader span{
  cursor:pointer;
  font-size:18px;
}

#ptableWindow iframe{
  width:100%;
  height:calc(100% - 42px);
  border:none;
}

/* PERIODIC TABLE BUTTON STYLE */

.ptable-btn{
  background:linear-gradient(135deg,#f97316,#ea580c);
  box-shadow:0 0 12px rgba(249,115,22,.8);
  font-size:19px;
}


/* FORMULA WINDOW */

#formulaWindow{
  position:fixed;
  inset:20px;
  background:#fff;
  border-radius:14px;
  z-index:3500;
  display:none;
  box-shadow:0 0 35px rgba(0,0,0,0.85);
  overflow:hidden;
}

#formulaWindow iframe{
  width:100%;
  height:calc(100% - 42px);
  border:none;
}



#calcWindow{
  position:fixed;
  width:360px;
  height:320px;
  top:90px;
  left:90px;
  background:#fff;
  border-radius:14px;
  z-index:4000;
  display:none;
  box-shadow:0 0 30px rgba(0,0,0,0.7);
  overflow:hidden;
  resize:both;
  min-width:340px;
  min-height:480px;
}


#calcHeader{
  height:38px;
  background:#0ea5e9;
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 12px;
  font-weight:600;
  cursor:move;
}

#calcHeader span{
  cursor:pointer;
  font-size:18px;
}

#calcWindow iframe{
  width:100%;
  height:calc(100% - 38px);
  border:none;
}

@media(max-width:480px){
  #calcWindow{
    width:95vw;
    height:80vh;
    left:2.5vw;
    top:10vh;
  }
}









/* ===== IIT-JEE ===== */
.sub-btn.jee-class11{
  background:#2563eb !important;
}

.sub-btn.jee-class12{
  background:#7c3aed !important;
}

/* ===== NEET ===== */
.sub-btn.neet-class11{
  background:#16a34a !important;
}

.sub-btn.neet-class12{
  background:#dc2626 !important;
}





</style>
</head>

<body>

<!-- LOGIN -->
<div class="login-container" id="loginUI">
  <div class="card">
    <h2>Email OTP Login</h2>
    <p><b>OTP will be sent to:</b></p>
    <p style="color:#4f46e5;font-weight:bold">g10.educational.platform@gmail.com</p>

    <div id="sendBox">
      <button id="sendOtpBtn" onclick="sendOTP()">Send OTP</button>
      <p class="msg" id="emailMsg"></p>
      <p id="otpInfo" style="display:none;color:#16a34a;font-size:14px;font-weight:600">✔ Check your mail</p>
    </div>

    <div id="otpBox" class="hidden">
      <input type="number" id="otp" placeholder="Enter OTP">
      <button onclick="verifyOTP()">Verify OTP</button>
      <p class="msg" id="otpMsg"></p>
    </div>
  </div>
</div>




<!-- MENU -->
<div id="menuScreen">
  <div class="menuBox">
    <h2>📚 Learning Dashboard</h2>
<!-- CLASS 9 -->
    <button class="acc-btn" onclick="toggleAcc(this)">Class 9</button>
    <div class="acc-content">

      <button class="sub-btn" onclick="toggleAcc(this)">Mathematics</button>
      <div class="acc-content">
        <div class="chapter"><b>Chapter 1</b>
          <div class="resource-row">
            <button onclick="openLink('https://docs.google.com/presentation/d/13DD4-9Z-iNC6H-oXjKDTraHKhfsHySRAbNvU6H-RF4U/preview')">PPT</button>
            <button onclick="openLink('#')">Test</button>
            <button onclick="openLink('#')">Solution</button>
          </div>
        </div>
		        <div class="chapter"><b>Chapter 2</b>
          <div class="resource-row">
            <button onclick="openLink('https://docs.google.com/presentation/d/1mszFLszPl6-uLOTRdpmkfXiHYQzoY3IlMXkxjpXdAjg/preview')">PPT</button>
            <button onclick="openLink('#')">Test</button>
            <button onclick="openLink('#')">Solution</button>
          </div>
        </div>
      </div>

      <button class="sub-btn" onclick="toggleAcc(this)">Science</button>
      <div class="acc-content">
        <div class="chapter"><b>Chapter 1</b>
          <div class="resource-row">
            <button onclick="openLink('https://docs.google.com/presentation/d/1kVW49cXZFuPYhGhPklPnoQYnQzH46ghlRT7dc35a98Q/preview')">PPT</button>
            <button onclick="openLink('#')">Test</button>
            <button onclick="openLink('#')">Solution</button>
          </div>
        </div>
      </div>
    </div>

    <!-- CLASS 10 -->
    <button class="acc-btn" onclick="toggleAcc(this)">Class 10</button>
    <div class="acc-content">
      <button class="sub-btn" onclick="toggleAcc(this)">Mathematics</button>
      <div class="acc-content">
        <div class="chapter"><b>Chapter 1</b>
          <div class="resource-row">
            <button onclick="openLink('https://docs.google.com/presentation/d/15U9khA6Mm5PKx8_0TsP2MNrKKs3Y8iI6hKk-Ie0GMk0/preview')">PPT</button>
            <button onclick="openLink('#')">Test</button>
            <button onclick="openLink('#')">Solution</button>
          </div>
        </div>
      </div>
	  
    </div>

    <!-- CLASS 11 -->
    <button class="acc-btn" onclick="toggleAcc(this)">Class 11</button>
    <div class="acc-content">
      <div class="chapter"><b>Physics</b>
        <div class="resource-row">
          <button onclick="openLink('https://docs.google.com/presentation/d/1mszFLszPl6-uLOTRdpmkfXiHYQzoY3IlMXkxjpXdAjg/embed')">PPT</button>
          <button onclick="openLink('#')">Test</button>
          <button onclick="openLink('#')">Solution</button>
        </div>
      </div>
    </div>

    <!-- CLASS 12 -->
    <button class="acc-btn" onclick="toggleAcc(this)">Class 12</button>
    <div class="acc-content">
      <div class="chapter"><b>Mathematics</b>
        <div class="resource-row">
          <button onclick="openLink('https://docs.google.com/presentation/d/1mszFLszPl6-uLOTRdpmkfXiHYQzoY3IlMXkxjpXdAjg/embed')">PPT</button>
          <button onclick="openLink('#')">Test</button>
          <button onclick="openLink('#')">Solution</button>
        </div>
      </div>
    </div>











<!-- IIT-JEE -->
<button class="acc-btn" onclick="toggleAcc(this)">IIT-JEE</button>
<div class="acc-content">

<!-- ================= PHYSICS ================= -->
<button class="sub-btn" onclick="toggleAcc(this)">Physics</button>
<div class="acc-content">

  <!-- CLASS 11 -->
  <button class="sub-btn jee-class11" onclick="toggleAcc(this)">Class 11</button>
  <div class="acc-content">

    <div class="chapter"><b>Chapter 1 Physical World and Measurement:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 2 Kinematics:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 3 Laws of Motion:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 4 Work, Energy, and Power:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 5 Rotational Motion:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 6 Gravitation:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 7 Properties of Solids and Liquids:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>
    <div class="chapter"><b>Chapter 8 Thermodynamics: </b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>
    <div class="chapter"><b>Chapter 9 Oscillations and Waves:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 10 </b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

  </div>

  <!-- CLASS 12 -->
  <button class="sub-btn jee-class12" onclick="toggleAcc(this)">Class 12</button>

  <div class="acc-content">

    <div class="chapter"><b>Chapter 1 Electrostatics:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 2 Current Electricity:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 3 Magnetic Effects of Current and Magnetism:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 4 Electromagnetic Induction and AC:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 5 Electromagnetic Waves:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 6 Optics:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 7 Modern Physics: </b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>
    <div class="chapter"><b>Chapter 8  </b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>
    <div class="chapter"><b>Chapter 9 </b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 10 </b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

  </div>

</div>


<!-- ================= CHEMISTRY ================= -->
<button class="sub-btn" onclick="toggleAcc(this)">Chemistry</button>
<div class="acc-content">

  <button class="sub-btn jee-class11" onclick="toggleAcc(this)">Class 11</button>

  <div class="acc-content">

    <div class="chapter"><b>Chapter 1</b>
      <div class="resource-row">
        <button onclick="openLink('#')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

  </div>
<button class="sub-btn jee-class12" onclick="toggleAcc(this)">Class 12</button>

  <div class="acc-content">

    <div class="chapter"><b>Chapter 1</b>
      <div class="resource-row">
        <button onclick="openLink('#')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

  </div>

</div>


<!-- ================= MATHEMATICS ================= -->
<button class="sub-btn" onclick="toggleAcc(this)">Mathematics</button>
<div class="acc-content">

  <button class="sub-btn jee-class11" onclick="toggleAcc(this)">Class 11</button>

  <div class="acc-content">

    <div class="chapter"><b>Chapter 1</b>
      <div class="resource-row">
        <button onclick="openLink('#')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

  </div>

<button class="sub-btn jee-class12" onclick="toggleAcc(this)">Class 12</button>

  <div class="acc-content">

    <div class="chapter"><b>Chapter 1</b>
      <div class="resource-row">
        <button onclick="openLink('#')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

  </div>

</div>

</div>


    <!-- NEET -->

  <button class="acc-btn" onclick="toggleAcc(this)">NEET</button>
<div class="acc-content">

<!-- ================= PHYSICS ================= -->
<button class="sub-btn" onclick="toggleAcc(this)">Physics</button>
<div class="acc-content">

  <!-- CLASS 11 -->
  <button class="sub-btn neet-class11" onclick="toggleAcc(this)">Class 11</button>

  <div class="acc-content">

    <div class="chapter"><b>Chapter 1 Physical World and Measurement:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 2 Kinematics:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 3 Laws of Motion:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 4 Work, Energy, and Power:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 5 Rotational Motion:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 6 Gravitation:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 7 Properties of Solids and Liquids:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>
    <div class="chapter"><b>Chapter 8 Thermodynamics: </b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>
    <div class="chapter"><b>Chapter 9 Oscillations and Waves:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 10 </b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

  </div>

  <!-- CLASS 12 -->
 <button class="sub-btn neet-class12" onclick="toggleAcc(this)">Class 12</button>
  <div class="acc-content">

    <div class="chapter"><b>Chapter 1 Electrostatics:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 2 Current Electricity:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 3 Magnetic Effects of Current and Magnetism:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 4 Electromagnetic Induction and AC:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 5 Electromagnetic Waves:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 6 Optics:</b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 7 Modern Physics: </b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>
    <div class="chapter"><b>Chapter 8  </b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>
    <div class="chapter"><b>Chapter 9 </b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

    <div class="chapter"><b>Chapter 10 </b>
      <div class="resource-row">
        <button onclick="openLink('/preview')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

  </div>

</div>


<!-- ================= CHEMISTRY ================= -->
<button class="sub-btn" onclick="toggleAcc(this)">Chemistry</button>
<div class="acc-content">

  <button class="sub-btn neet-class11" onclick="toggleAcc(this)">Class 11</button>
  <div class="acc-content">

    <div class="chapter"><b>Chapter 1</b>
      <div class="resource-row">
        <button onclick="openLink('#')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

  </div>

<button class="sub-btn neet-class12" onclick="toggleAcc(this)">Class 12</button>

  <div class="acc-content">

    <div class="chapter"><b>Chapter 1</b>
      <div class="resource-row">
        <button onclick="openLink('#')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

  </div>

</div>


<!-- ================= BIOLOGY ================= -->
<button class="sub-btn" onclick="toggleAcc(this)">Biology</button>
<div class="acc-content">

 <button class="sub-btn neet-class11" onclick="toggleAcc(this)">Class 11</button>

  <div class="acc-content">

    <div class="chapter"><b>Chapter 1</b>
      <div class="resource-row">
        <button onclick="openLink('#')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

  </div>

<button class="sub-btn neet-class12" onclick="toggleAcc(this)">Class 12</button>

  <div class="acc-content">

    <div class="chapter"><b>Chapter 1</b>
      <div class="resource-row">
        <button onclick="openLink('#')">PPT</button>
        <button onclick="openLink('#')">Test</button>
        <button onclick="openLink('#')">Solution</button>
      </div>
    </div>

  </div>

</div>

</div>

   <!-- EXTRA LINKS -->
<div style="margin-top:12px;display:flex;gap:8px">
  <button style="background:#0ea5e9" 
          onclick="window.open('https://practice-test-backend.onrender.com','_blank')">
    Administrator
  </button>

  <button style="background:#22c55e" 
          onclick="window.open('https://gten-educational-platform.github.io/Class-12/bill 103.html','_blank')">
    Invoice
  </button>
</div>

<button style="background:#ef4444;margin-top:10px" onclick="logout()">Logout</button>

  </div>
</div>

<!-- FULLSCREEN PPT -->
<div id="frameContainer">
  <button id="backBtn" class="float-btn" onclick="backToMenu()">⮌</button>
  <button id="logoutBtn" class="float-btn" onclick="logout()">⏻</button>

  <button id="penBtn" class="float-btn" onclick="setTool('pen')">✏</button>
  <button id="eraserBtn" class="float-btn" onclick="setTool('eraser')">🧽</button>
  <button id="clearBtn" class="float-btn" onclick="clearCanvas()">🗑</button>
 <button id="plusBtn" class="float-btn icon-btn" onclick="changePenSize(1)">➕</button>
<button id="minusBtn" class="float-btn icon-btn" onclick="changePenSize(-1)">➖</button>
<button id="whiteboardBtn" class="float-btn" style="left:10px; top:60px;" onclick="openWhiteboard()">🧾</button>
<button id="ptableBtn" class="float-btn ptable-btn" style="left:10px; top:110px;" onclick="openPeriodic()">⚛</button>
<button class="float-btn ptable-btn" style="left:10px; top:160px; background:#22c55e"
        onclick="openFormula('chem')">🧪</button>

<button class="float-btn ptable-btn" style="left:10px; top:210px; background:#3b82f6"
        onclick="openFormula('phy')">🧲</button>

<button class="float-btn ptable-btn" style="left:10px; top:260px; background:#a855f7"
        onclick="openFormula('math')">📐</button>
<button id="calcBtn" class="float-btn ptable-btn"
        style="left:10px; top:310px; background:#0ea5e9"
        onclick="openCalculator()">🧮</button>




<div id="timerBox">00:00:00</div>


<div id="sizeLabel">3</div>

  <div id="colorTray">
  <span style="background:red" onclick="setColor('red')"></span>
  <span style="background:blue" onclick="setColor('blue')"></span>
  <span style="background:green" onclick="setColor('green')"></span>
  <span style="background:yellow" onclick="setColor('yellow')"></span>
  <span style="background:white" onclick="setColor('white')"></span>
  <span class="color-dot" style="background:black" onclick="setColor('black')"></span>
<span class="color-dot" style="background:maroon" onclick="setColor('maroon')"></span>
  <span class="color-dot" style="background:navy" onclick="setColor('navy')"></span>
  <span class="color-dot" style="background:#7CB342" onclick="setColor('#7CB342')"></span> <!-- buff green -->
</div>


  <canvas id="drawCanvas"></canvas>

  <iframe id="mainFrame" allowfullscreen></iframe>
</div>


<div id="whiteboardWindow">
  <div id="whiteboardHeader">
    Whiteboard
    <span onclick="closeWhiteboard()">✖</span>
  </div>
  <canvas id="whiteboardCanvas"></canvas>
</div>

<div id="ptableWindow">
  <div id="ptableHeader">
    Periodic Table
    <span onclick="closePeriodic()">✖</span>
  </div>
  <iframe src="https://ptable.com/#Properties" frameborder="0"></iframe>
</div>


<div id="formulaWindow">
  <div id="ptableHeader">
    Formula Sheet
    <span onclick="closeFormula()">✖</span>
  </div>
  <iframe id="formulaFrame"></iframe>
</div>


<div id="calcWindow" class="drag-box">
  <div id="calcHeader" onmousedown="dragStart(event)" ontouchstart="dragStart(event)">
    🧮 Calculator
    <span onclick="closeCalculator()">✖</span>
  </div>
  <iframe id="calcFrame"></iframe>
</div>


<script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
<script>
emailjs.init("5Hb6w86d9jhSLBa9y");

const SERVICE_ID="service_ypvhncp";
const TEMPLATE_ID="template_wvtlep4";
let OTP=null;

function sendOTP(){
  const sendBox = document.getElementById("sendBox");
  const otpBox = document.getElementById("otpBox");

  OTP = Math.floor(100000 + Math.random() * 900000);

  emailjs.send(SERVICE_ID, TEMPLATE_ID, { otp: OTP })
  .then(() => {

    otpUiFeedback(); // UI change first

    // small delay so message is visible
    setTimeout(() => {
      sendBox.classList.add("hidden");
      otpBox.classList.remove("hidden");
    }, 800);

  })
  .catch(() => {
    emailMsg.textContent = "Failed to send OTP";
  });
}






let dragItem = null;
let offsetX = 0;
let offsetY = 0;

function dragStart(e){
  dragItem = document.getElementById("calcWindow");

  let rect = dragItem.getBoundingClientRect();

  if(e.touches){
    offsetX = e.touches[0].clientX - rect.left;
    offsetY = e.touches[0].clientY - rect.top;
  } else {
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  }

  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragEnd);
  document.addEventListener("touchmove", dragging, {passive:false});
  document.addEventListener("touchend", dragEnd);
}

function dragging(e){
  if(!dragItem) return;
  e.preventDefault();

  let x,y;

  if(e.touches){
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }

  dragItem.style.left = (x - offsetX) + "px";
  dragItem.style.top  = (y - offsetY) + "px";
}

function dragEnd(){
  dragItem = null;
  document.removeEventListener("mousemove", dragging);
  document.removeEventListener("mouseup", dragEnd);
  document.removeEventListener("touchmove", dragging);
  document.removeEventListener("touchend", dragEnd);
}








function verifyOTP(){
  if(otp.value.trim()!==OTP?.toString()){
    otpMsg.textContent="Invalid OTP";return;
  }
  loginUI.style.display="none";
  menuScreen.style.display="block";
}





function openLink(url){
  clearCanvas();   // auto clear on slide change
  menuScreen.style.display="none";
  frameContainer.style.display="block";
  mainFrame.src=url;
}







function backToMenu(){
  frameContainer.style.display="none";
  menuScreen.style.display="block";
  mainFrame.src="";
}

function logout(){location.reload();}

function toggleAcc(btn){
  const content=btn.nextElementSibling;
  const siblings=btn.parentElement.querySelectorAll(".acc-content");
  siblings.forEach(d=>{if(d!==content) d.style.display="none";});
  content.style.display=(content.style.display==="block")?"none":"block";
}




function otpUiFeedback(){
  const btn = document.getElementById("sendOtpBtn");
  const info = document.getElementById("otpInfo");

  btn.style.background = "#16a34a";   // green
  btn.innerText = "OTP Sent";
  btn.disabled = true;

  info.style.display = "block";
  }
  
  
/* ===== DRAW TOOL ===== */
const canvas = document.getElementById("drawCanvas");
const whiteboardWindow = document.getElementById("whiteboardWindow");
const wbCanvas = document.getElementById("whiteboardCanvas");
const wbCtx = wbCanvas.getContext("2d");

let lastX = 0, lastY = 0;
let lastTX = 0, lastTY = 0;


const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";


let drawing = false;
let tool = "pen";
let penMode = false;
let penColor = "red";
let penSize = 3;
let eraserSize = 20;


function setColor(c){
  penColor = c;
  enablePen();   // auto enable pen when color selected
}






function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);





function setTool(t){
  tool = t;

  if(penMode && t === "pen"){
    disablePen();   // toggle OFF
  } else {
    enablePen();    // toggle ON
  }
}





function enablePen(){
  penMode = true;
  canvas.style.display = "block";
  canvas.style.pointerEvents = "auto";
  penBtn.classList.add("pen-active");
}








function disablePen(){
  penMode = false;
  canvas.style.pointerEvents = "none";
  penBtn.classList.remove("pen-active");

  // 🔥 FIX: Return focus to slide iframe so Next works instantly
  mainFrame.focus();
}










function changePenSize(delta){
  penSize += delta;

  if(penSize < 1) penSize = 1;
  if(penSize > 20) penSize = 20;

  document.getElementById("sizeLabel").innerText = penSize;
  enablePen();
}




/* ===== MOUSE MOVE SUPPORT ===== */
canvas.addEventListener("mousedown", e => {
  if(!penMode) return;
  drawing = true;
  lastX = e.clientX;
  lastY = e.clientY;
});


canvas.addEventListener("mousemove", e => {
  if(!drawing || !penMode) return;

  const x = e.clientX;
  const y = e.clientY;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if(tool === "pen"){
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.shadowBlur = 0.4;   // ⭐ micro smooth edge
    ctx.shadowColor = penColor;
  } else {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = eraserSize;
  }

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
});





window.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();   // 🔥 resets drawing path (VERY IMPORTANT)
});







/* ===== TRIPLE CLICK / TAP TO DISABLE PEN ===== */

let tapCount = 0;
let tapTimer = null;

function handleTripleTap(){
  tapCount++;

  if(tapCount === 1){
    tapTimer = setTimeout(() => tapCount = 0, 500); // reset after 500ms
  }

  if(tapCount === 3){
    disablePen();
    tapCount = 0;
    clearTimeout(tapTimer);
  }
}

/* Desktop triple click */
document.addEventListener("click", handleTripleTap);

/* Mobile triple tap */
document.addEventListener("touchstart", handleTripleTap);








/* ===== MOBILE TOUCH SUPPORT ===== */
canvas.addEventListener("touchstart", e => {
  if(!penMode) return;
  e.preventDefault();

  drawing = true;
  const t = e.touches[0];
  lastTX = t.clientX;
  lastTY = t.clientY;
}, {passive:false});



canvas.addEventListener("touchmove", e => {
  if(!drawing || !penMode) return;
  e.preventDefault();

  const t = e.touches[0];
  const x = t.clientX;
  const y = t.clientY;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if(tool === "pen"){
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.shadowBlur = 0.4;
    ctx.shadowColor = penColor;
  } else {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = eraserSize;
  }

  ctx.beginPath();
  ctx.moveTo(lastTX, lastTY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastTX = x;
  lastTY = y;
}, {passive:false});





/* ===== WHITEBOARD ===== */



function resizeWB(){
  const rect = wbCanvas.getBoundingClientRect();
  wbCanvas.width  = rect.width * window.devicePixelRatio;
  wbCanvas.height = rect.height * window.devicePixelRatio;
  wbCtx.setTransform(window.devicePixelRatio,0,0,window.devicePixelRatio,0,0);
}

window.addEventListener("resize", resizeWB);

function openWhiteboard(){
  whiteboardWindow.style.display = "block";
  resizeWB();
}

function closeWhiteboard(){
  whiteboardWindow.style.display = "none";
}

/* whiteboard drawing */

let wbDrawing = false;
let wbLastX = 0;
let wbLastY = 0;


wbCanvas.addEventListener("mousedown", e => {
  wbDrawing = true;
  wbCtx.beginPath();
  wbCtx.moveTo(e.offsetX, e.offsetY);
});

wbCanvas.addEventListener("mousemove", e => {
  if(!wbDrawing) return;

  wbCtx.lineCap = "round";
  wbCtx.lineJoin = "round";

  if(tool === "pen"){
    wbCtx.globalCompositeOperation = "source-over";
    wbCtx.strokeStyle = penColor;
    wbCtx.lineWidth = penSize;
  } else {
    wbCtx.globalCompositeOperation = "destination-out";
    wbCtx.lineWidth = 20;
  }

  wbCtx.lineTo(e.offsetX, e.offsetY);
  wbCtx.stroke();
});

window.addEventListener("mouseup", () => wbDrawing = false);

/* ===== WHITEBOARD TOUCH SUPPORT ===== */

/* ===== WHITEBOARD TOUCH DRAW FIX ===== */

function getTouchPos(canvas, e){
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
}

wbCanvas.addEventListener("touchstart", e => {
  e.preventDefault();
  wbDrawing = true;
  const pos = getTouchPos(wbCanvas, e);
  wbLastX = pos.x;
  wbLastY = pos.y;
});

wbCanvas.addEventListener("touchmove", e => {
  if(!wbDrawing) return;
  e.preventDefault();

  const pos = getTouchPos(wbCanvas, e);

  wbCtx.lineCap = "round";
  wbCtx.lineJoin = "round";

  if(tool === "pen"){
    wbCtx.globalCompositeOperation = "source-over";
    wbCtx.strokeStyle = penColor;
    wbCtx.lineWidth = penSize;
  } else {
    wbCtx.globalCompositeOperation = "destination-out";
    wbCtx.lineWidth = 20;
  }

  wbCtx.beginPath();
  wbCtx.moveTo(wbLastX, wbLastY);
  wbCtx.lineTo(pos.x, pos.y);
  wbCtx.stroke();

  wbLastX = pos.x;
  wbLastY = pos.y;
});

wbCanvas.addEventListener("touchend", () => wbDrawing = false);









/* ===== PERFECT SLIDE + PEN CONTROL ===== */

let blockOnce = false;

/* Mouse wheel */
document.addEventListener("wheel", e => {
  if(penMode && !blockOnce){
    disablePen();
    blockOnce = true;
    return;
  }
  blockOnce = false;
}, {passive:true});

/* Keyboard navigation */
document.addEventListener("keydown", e => {
  if(["ArrowRight","ArrowLeft","PageDown","PageUp"," ","Enter"].includes(e.key)){
    if(penMode && !blockOnce){
      disablePen();
      blockOnce = true;
      return;
    }
    blockOnce = false;
  }
});





/* ===== TIMER ===== */



let seconds = 0;

function startTimer(){
  setInterval(() => {
    seconds++;

    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    timerBox.innerText =
      String(h).padStart(2,'0') + ":" +
      String(m).padStart(2,'0') + ":" +
      String(s).padStart(2,'0');
  }, 1000);
}

startTimer();





function openPeriodic(){
  document.getElementById("ptableWindow").style.display = "block";
}

function closePeriodic(){
  document.getElementById("ptableWindow").style.display = "none";
}

function closeFormula(){
  document.getElementById("formulaWindow").style.display = "none";
  document.getElementById("formulaFrame").src = "";
}


function openFormula(type){
  const frame = document.getElementById("formulaFrame");
  document.getElementById("formulaWindow").style.display = "block";

  if(type === "chem")
    frame.src = "https://gten-educational-platform.github.io/Class-12/chemistry formula.html";
  else if(type === "phy")
    frame.src = "https://gten-educational-platform.github.io/Class-12/Physics%20formula.html";
  else
    frame.src = "https://byjus.com/maths/formulas/";
}




function openCalculator(){
  document.getElementById("calcWindow").style.display = "block";
  document.getElementById("calcFrame").src = "https://www.desmos.com/scientific";
}

function closeCalculator(){
  document.getElementById("calcWindow").style.display = "none";
  document.getElementById("calcFrame").src = "";
}

function clearCanvas(){
  // Clear PPT drawing canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Clear whiteboard canvas
  wbCtx.clearRect(0, 0, wbCanvas.width, wbCanvas.height);

  // Auto disable pen after clear
  disablePen();
}


</script>


</body>
</html>

