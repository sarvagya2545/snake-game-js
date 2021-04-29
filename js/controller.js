import UIctrl from './UI.js';
import LogicCtrl from './gamedata.js';

const initSnakeHead = [0,0];
const initFoodPos = [2,0];
let head = initSnakeHead;
let snakeInterval;
const timeInterval = 300;

// status => 0 (game over), 1 (food ingested), 2 (normal case)

/* MAIN LOGIC HERE */
(function() {

    function moveSnakeEvent() {
        const res = LogicCtrl.moveSnake()
        head = res.head
    
        if(!res.status) {
            clearInterval(snakeInterval);
            return alert('Game over!');
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

    function init() {
        // create a board on the screen
        UIctrl.generateBoard();

        // set initial data for the board
        LogicCtrl.initData(initSnakeHead, initFoodPos, [20,20]);
        UIctrl.genSnakeHead(initSnakeHead);
        UIctrl.genFoodItem(initFoodPos);

        // set the event listeners
        setEventListeners();

        // start the the movement of the snake
        snakeInterval = setInterval(moveSnakeEvent, timeInterval);
    }

    function setEventListeners() {
        document.addEventListener('keydown', function(e) {
            if(e.key === 'ArrowUp') return LogicCtrl.changeDirection(0);
            if(e.key === 'ArrowRight') return LogicCtrl.changeDirection(2);
            if(e.key === 'ArrowLeft') return LogicCtrl.changeDirection(3);
            if(e.key === 'ArrowDown') return LogicCtrl.changeDirection(1);
        })
    }

    init();

})()