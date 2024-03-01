//declaration:--------------------------------------------------
let startStopBtn = document.getElementById("startStop");
let resetBtn = document.getElementById("reset");
let monitor = document.getElementById("monitor");
let secends = 0;
let interval;
let clrInterval;
let isCounting = false;
let speed = document.getElementById("speed");
let speedMonitor = document.getElementById("speed__monitor");
let timeOut = document.getElementById("time__out");

//functions:--------------------------------------------------
function startHandler() {
  if (!isCounting) {
    if (secends <= timeOut.value * 60) {
      interval = setInterval(() => {
        if (secends >= timeOut.value * 60) {
          stopHandler();
          // secends = 0;
          startStopBtn.style.color = "red";
          startStopBtn.style.cursor = "not-allowed";
        }
        let minutes = Math.floor(secends / 60);
        monitor.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${
          secends % 60 < 10 ? "0" + (secends % 60) : secends % 60
        }`;
        secends++;
      }, speed.value);
      isCounting = true;
      startStopBtn.innerText = "stop";
    }
  }
}

function stopHandler() {
  if (isCounting) {
    clrInterval = clearInterval(interval);
    isCounting = false;
    startStopBtn.innerText = "start";
  }
}
//listeners:--------------------------------------------------
startStopBtn.addEventListener("click", () => {
  if (isCounting) {
    stopHandler();
  } else {
    startHandler();
  }
});

resetBtn.addEventListener("click", () => {
  startStopBtn.style.color = "white";
  startStopBtn.style.cursor = "pointer";
  monitor.innerHTML = "00:00";
  secends = 0;
  clrInterval = clearInterval(interval);
  isCounting = false;
  speed.value = 200;
  speedMonitor.innerHTML = `${speed.value}x`;
  startStopBtn.innerText = "start";
});

speed.addEventListener("change", () => {
  speedMonitor.innerHTML = `${speed.value}x`;
  if (isCounting) {
    stopHandler();
    startHandler();
  }
});
