import { gameCtrl } from "./controller.js";
const boardSizeSlider = document.querySelector('[data-board-size]');
const boardSizeOutput = document.getElementById('boardSizeOutput');
const gameConfigForm = document.querySelector('[data-game-config]');
const gamePopup = document.querySelector('.start-panel-wrapper');

// board size indicator & slider
boardSizeSlider.addEventListener('change', e => {
    boardSizeOutput.innerText = e.target.value;
})

gameConfigForm.addEventListener('submit', e => {
    e.preventDefault();
    gamePopup.classList.add('hidden');

    let gameTimeMap = {
        "Easy": 150,
        "Medium": 100,
        "Hard": 50
    };
    let gameTime;

    var radioButtons = document.getElementsByName("difficulty");
    radioButtons.forEach(radioBtn => {
        if(radioBtn.checked) {
            gameTime = gameTimeMap[radioBtn.value];
        }
    })

    const onGameEnd = () => {
        gamePopup.classList.remove('hidden');
    }

    gameCtrl.init(gameTime, parseInt(boardSizeSlider.value, 10), onGameEnd);
})
