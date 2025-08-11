let startBtn = document.getElementById("startBtn");
let lapBtn = document.getElementById("lapBtn");
let display = document.getElementById("display");
let laps = document.getElementById("laps");

let timer = null;
let [hrs, mins, secs] = [0, 0, 0];
let running = false;

function updateDisplay() {
  let h = hrs < 10 ? "0" + hrs : hrs;
  let m = mins < 10 ? "0" + mins : mins;
  let s = secs < 10 ? "0" + secs : secs;
  display.innerText = `${h}:${m}:${s}`;
}

function tick() {
  secs++;
  if (secs === 60) {
    secs = 0;
    mins++;
  }
  if (mins === 60) {
    mins = 0;
    hrs++;
  }
  updateDisplay();
}

startBtn.addEventListener("click", () => {
  if (!running) {
    timer = setInterval(tick, 1000);
    startBtn.textContent = "Stop";
    startBtn.classList.add("stop");
    lapBtn.textContent = "Lap";
    running = true;
  } else {
    clearInterval(timer);
    startBtn.textContent = "Start";
    startBtn.classList.remove("stop");
    lapBtn.textContent = "Reset";
    running = false;
  }
});

lapBtn.addEventListener("click", () => {
  if (running) {
    let li = document.createElement("li");
    li.textContent = display.textContent;
    laps.prepend(li);
  } else {
    [hrs, mins, secs] = [0, 0, 0];
    updateDisplay();
    laps.innerHTML = "";
    lapBtn.textContent = "Lap";
  }
});
