let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

function startPause() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 1000 / 60);
        startPauseButton.textContent = 'Pause';
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        startPauseButton.textContent = 'Start';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timerInterval);
    startTime = null;
    difference = 0;
    isRunning = false;
    display.textContent = '00:00:00';
    startPauseButton.textContent = 'Start';
    laps = [];
    updateLaps();
}

function lap() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        laps.push(lapTime);
        updateLaps();
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let milliseconds = parseInt((time % 1000) / 10);
    let seconds = parseInt((time / 1000) % 60);
    let minutes = parseInt((time / (1000 * 60)) % 60);
    let hours = parseInt((time / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return `${hours}:${minutes}:${seconds}`;
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lapTime, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapsList.appendChild(li);
    });
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
