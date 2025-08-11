let sessionLength = 20;
let breakLength = 5;
let isSession = true;
let timerRunning = false;
let interval;
let timeRemaining = sessionLength * 60;
let sessionCount = 1;

const timerDisplay = document.getElementById("timer");
const sessionLengthEl = document.getElementById("session-length");
const breakLengthEl = document.getElementById("break-length");
const startStopBtn = document.getElementById("start-stop");
const resetBtn = document.getElementById("reset");
const modeDisplay = document.getElementById("mode");
const progressBar = document.getElementById("progress-bar");

const updateDisplay = () => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

const toggleControls = (disable) => {
  document.querySelectorAll(".btn").forEach((btn) => (btn.disabled = disable));
};

const switchMode = () => {
  isSession = !isSession;
  if (isSession) {
    sessionCount++;
    timeRemaining = sessionLength * 60;
    modeDisplay.textContent = `Session ${sessionCount}`;
    progressBar.style.backgroundColor = "teal";
  } else {
    timeRemaining = breakLength * 60;
    modeDisplay.textContent = "Break!";
    progressBar.style.backgroundColor = "tomato";
  }
};

const updateProgressBar = () => {
  const total = isSession ? sessionLength * 60 : breakLength * 60;
  const percent = ((total - timeRemaining) / total) * 100;
  progressBar.style.width = `${100 - percent}%`;
};

const countdown = () => {
  if (timeRemaining > 0) {
    timeRemaining--;
    updateDisplay();
    updateProgressBar();
  } else {
    switchMode();
    updateDisplay();
  }
};

startStopBtn.addEventListener("click", () => {
  if (timerRunning) {
    clearInterval(interval);
    startStopBtn.textContent = "Start";
    toggleControls(false);
  } else {
    interval = setInterval(countdown, 1000);
    startStopBtn.textContent = "Pause";
    toggleControls(true);
  }
  timerRunning = !timerRunning;
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  timerRunning = false;
  isSession = true;
  sessionCount = 1;
  sessionLength = 20;
  breakLength = 5;
  sessionLengthEl.textContent = sessionLength;
  breakLengthEl.textContent = breakLength;
  timeRemaining = sessionLength * 60;
  modeDisplay.textContent = "Session 1";
  startStopBtn.textContent = "Start";
  progressBar.style.width = "100%";
  toggleControls(false);
  updateDisplay();
});

document.getElementById("session-increase").onclick = () => {
  sessionLength++;
  sessionLengthEl.textContent = sessionLength;
  if (!timerRunning && isSession) timeRemaining = sessionLength * 60;
  updateDisplay();
};

document.getElementById("session-decrease").onclick = () => {
  if (sessionLength > 1) {
    sessionLength--;
    sessionLengthEl.textContent = sessionLength;
    if (!timerRunning && isSession) timeRemaining = sessionLength * 60;
    updateDisplay();
  }
};

document.getElementById("break-increase").onclick = () => {
  breakLength++;
  breakLengthEl.textContent = breakLength;
};

document.getElementById("break-decrease").onclick = () => {
  if (breakLength > 1) {
    breakLength--;
    breakLengthEl.textContent = breakLength;
  }
};

updateDisplay();
