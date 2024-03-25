const words = ['world', 'study', 'language', 'creation', 'life', 'plant', 'amazing', 'strengths', 'family', 'weather', 'popcorn', 'unicorn', 'apple', 'strengths', 'screenager'];

const word = document.querySelector('.word');
const timer = document.querySelector('#timer');
const correctCount = document.querySelector('.correct-count');
const wrongCount = document.querySelector('.wrong-count');
const wordMistakes = document.querySelector('.word-mistakes');

function getRandomInt() {
    return Math.floor(Math.random() * words.length);
};

let randomWord = words[getRandomInt()];

function substituteRandomWord() {
    word.innerHTML = '';

    randomWord = words[getRandomInt()];

    for (let letter of randomWord) {
        const span = document.createElement('span');
        span.textContent = letter;
        word.append(span);
    };
};

substituteRandomWord();

let idx = 0;
let currentTimer = 0;
let timerId = 0;

document.addEventListener('keypress', (event) => {
    currentTimer++;
    if (currentTimer === 1) {
        startTimer();
    };

    const span = word.querySelectorAll('span');

    if (event.key === randomWord[idx]) {
        span[idx].classList.add('c');
        span[idx].classList.remove('w');
        idx++;
    } else {
        span[idx].classList.add('w');
        wordMistakes.textContent = ++wordMistakes.textContent;
    };

    if (idx === randomWord.length) {
        if (wordMistakes.textContent > 0) {
            wrongCount.textContent = ++wrongCount.textContent;
        } else {
            correctCount.textContent = ++correctCount.textContent;
        };
        idx = 0;
        wordMistakes.textContent = 0;

        if (+wrongCount.textContent === 5 || +correctCount.textContent === 5) {
            setTimeout(stopTimer, 0);
        } else {
            substituteRandomWord();
        };
    };
});

function startTimer() {
    let minutes = +timer.textContent.slice(0, 2);
    let seconds = +timer.textContent.slice(3, 5);

    timerId = setInterval(() => {
        seconds++;
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        };

        timer.textContent = `${format(minutes)}:${format(seconds)}`;
    }, 1000);
};

function format(val) {
    if (val < 10) {
        return `0${val}`;
    };
    return val;
};

function stopTimer() {
    clearInterval(timerId);
    
    if (+correctCount.textContent === 5) {
        alert(`Победа! Ваше время ${timer.textContent}`);
    } else if (+wrongCount.textContent === 5) {
        alert(`Неудача! Ваше время ${timer.textContent}`);
    };

    correctCount.textContent = 0;
    wrongCount.textContent = 0;
    timer.textContent = '00:00';
    substituteRandomWord();
    currentTimer = 0;

    return result;
};