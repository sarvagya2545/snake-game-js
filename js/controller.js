import UIctrl from './UI.js';
import LogicCtrl from './gamedata.js';

const initSnakeHead = [0,0];
const initFoodPos = [2,0];

let snakeInterval;
let head;
let gameEndFn;

/* GAME CONTROLLER HERE */
export const gameCtrl = (function() {
    
    function moveSnakeEvent() {
        const res = LogicCtrl.moveSnake()
        head = res.head
        
        // res.status => 0 (game over), 1 (food ingested), 2 (normal case)
        if(!res.status) {
            clearInterval(snakeInterval);
            alert('Game over!')
            destroy();
            return;
        }
    
        if(res.status == 2) {
            UIctrl.moveSnake(head, res.nextHead, res.tail, true);
        }
        
        if(res.status == 1) {
            UIctrl.moveSnake(head, res.nextHead, null, false);
            UIctrl.removeFood(res.nextHead);
            UIctrl.genFoodItem(LogicCtrl.eatFood());
            UIctrl.incScore();
        }
    }

    function init(timeInterval, boardSize, fn) {
        // create a board on the screen
        UIctrl.generateBoard(boardSize, boardSize);
        head = initSnakeHead;
        gameEndFn = fn;

        // set initial data for the board
        LogicCtrl.initData(initSnakeHead, initFoodPos, [boardSize,boardSize]);
        UIctrl.genSnakeHead(initSnakeHead);
        UIctrl.genFoodItem(initFoodPos);

        // set the event listeners
        setEventListeners();

        // start the the movement of the snake
        snakeInterval = setInterval(moveSnakeEvent, timeInterval);
    }

    const changeDirection = function(e) {
        if(e.key === 'ArrowUp') return LogicCtrl.changeDirection(0);
        if(e.key === 'ArrowRight') return LogicCtrl.changeDirection(2);
        if(e.key === 'ArrowLeft') return LogicCtrl.changeDirection(3);
        if(e.key === 'ArrowDown') return LogicCtrl.changeDirection(1);
    }

    function setEventListeners() {
        document.addEventListener('keydown', changeDirection)
    }

    function destroyEventListeners() {
        document.removeEventListener('keydown', changeDirection);
    }

    function destroy() {
        UIctrl.destroyBoard();
        LogicCtrl.resetData();
        destroyEventListeners();
        gameEndFn();
    }

    return { init };

})()