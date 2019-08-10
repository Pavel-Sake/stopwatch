let seconds = 0;
let intervalId = null;
let intervalsNumber = null;

const startPauseButton = document.querySelector('.actions__start-pause');
const screenTime = document.querySelector('.screen__time');
const clean = document.querySelector('.actions__clean-interval');
const timeInterval = document.querySelector('.time__interval');
const intervalsScreen = document.querySelector('.intervals');
const animation = document.querySelector('.animation');
const clildrenIntervalsScreen = intervalsScreen.children;

startPauseButton.addEventListener('click', handleClickStartPauseButton);
clean.addEventListener('click', cleanButton);
timeInterval.addEventListener('click', intervalButton);

function handleClickStartPauseButton(event) {
    const nameButton = startPauseButton.textContent;

    if (nameButton === 'старт') {
        intervalId = setInterval(startStopwatch, 1000);
        changeNameButton(startPauseButton, 'пауза');

        setButtonToDisabled(clean, false);
        setButtonToDisabled(timeInterval, false);

        animation.classList.add('animation');
        animation.classList.remove('stop');
        animation.classList.add('start');
    } else if (nameButton === 'пауза') {
        clearInterval(intervalId);
        changeNameButton(startPauseButton, 'старт');
        animation.classList.add('stop')
    }
}

function cleanButton(event) {
    seconds = 0;
    intervalsNumber = 0;

    showTime(seconds);
    clearInterval(intervalId);
    changeNameButton(startPauseButton, 'старт');

    while (intervalsScreen.firstChild) {
        intervalsScreen.removeChild(intervalsScreen.firstChild);
    }

    animation.classList.remove('animation');

    setButtonToDisabled(clean, true);
    setButtonToDisabled(timeInterval, true);
}

function setButtonToDisabled(button, disabled) {
    button.disabled = disabled;
}

function intervalButton(event) {
    const newInterval = document.createElement('span');
    intervalsNumber++;

    newInterval.textContent = intervalsNumber + '- ' + screenTime.textContent;
    intervalsScreen.appendChild(newInterval);
    intervalsScreen.scrollTop = intervalsScreen.scrollHeight;
}

function changeNameButton(button, name) {
    button.textContent = name;
}

function startStopwatch() {
    seconds++;
    showTime(seconds);
}

function showTime(allSeconds) {
    const time = getTime(allSeconds);
    screenTime.textContent = time;
}

function getTime(allSeconds) {
    let minutes = Math.floor(allSeconds / 60);
    let seconds = allSeconds - (minutes * 60);

    minutes = convertNumberToTimeString(minutes);
    seconds = convertNumberToTimeString(seconds);

    const time = `${minutes}:${seconds}`;
    return time;
}

function convertNumberToTimeString(number) {
    let result = +number;

    if (number < 10) {
        result = `0${number}`;
    }

    return result;
}
