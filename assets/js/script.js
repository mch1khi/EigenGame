window.addEventListener('load', init);

const levels = {
    easy: 5,
    medium: 3,
    hard: 1
};

const currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentLetter = document.querySelector('#current-letter');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const Letter = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
];

// Initialize Game
function init() {
    seconds.innerHTML = currentLevel;
    showLetter(Letter);
    wordInput.addEventListener('input', startMatch());
    setInterval(countdown, 1000);
    setInterval(checkStatus, 50);
}

function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showLetter(Letter);
        wordInput.value = '';
        score++;
    }

    if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
        sessionStorage['highscore'] = score;
    } else {
        sessionStorage['highscore'] = sessionStorage['highscore'];
    }

    if (sessionStorage['highscore'] >= 0) {
        highscoreDisplay.innerHTML = sessionStorage['highscore'];
    }

    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

function matchWords() {
    if (wordInput.value === currentLetter.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

function showWord(Letter) {
    const randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];
}

function countdown() {
    if (time > 0) {
        time--;
    } else if (time === 0) {
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}

function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Het is voorbij. Volgende ronde beter!';
        score = -1;
    }
}