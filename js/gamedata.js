import Queue from './queue.js'

/*
    variables meaning: 
    
    snake => spaces currently occupied by the snake
    e.g. 87 in the snake queue represented the cell with the class => .grid-8-7

    dir => current direction:
        0 Up
        1 Down
        2 Right
        3 Left
*/

const data = (function() {

    // define game data
    let snakeHead; // the current head of the snake
    let snake = new Queue(); // snake is a queue
    let dir = 1;
    let score = 0;
    let food; // the current food square
    let boardSizeX;
    let boardSizeY;
    let allCells = [];

    const initData = (head, startfood, [ bsX, bsY ]) => {
        snakeHead = head;
        food = startfood;
        boardSizeX = bsX;
        boardSizeY = bsY;
        snake.enq(head);
        for(let i = 0; i < bsX; i++) {
            for(let j = 0; j < bsY; j++) {
                allCells.push([i,j]);
            }
        }
    }

    function getGameDetails() {
        console.log(snake.q);
    }

    // move snake 1 step in the direction
    function moveSnake() {
        const prevHead = snake.top();
        const [currX, currY] = prevHead;
        
        // a and b will help in recognising direction
        let a = Math.floor(dir / 2);
        let b = (dir % 2);

        /*
            calculate next cell in X and Y direction.
            follow the direction specs given above.

            !a  -> for negation of a
            Math.pow -> for switching b/w 1 and -1
        */
        let nextCellX = (!a) * Math.pow(-1, !b) + currX;
        let nextCellY = a * Math.pow(-1, b) + currY;
        
        // prevent snake from overflowing the board
        nextCellX = nextCellX < 0 ? nextCellX + boardSizeX : nextCellX;
        nextCellY = nextCellY < 0 ? nextCellY + boardSizeY : nextCellY;
        
        let nextCell = [
            (nextCellX) % boardSizeX,
            (nextCellY) % boardSizeY
        ];

        let isFoodCellNext = nextCell.toString() === food.toString();
        let isSnakeCellNext = snake.find(nextCell);

        /*
            if food cell is next, (status 1)
                we want to enqueue but not dequeue the snake, thus increasing it's length
                also we regenerate a random food item at some place not covered by snake
            
            if snake cell is the next, (status 0)
                we will both enqueue and dequeue but the game is over

            if none of these cases occur, (status 2)
                we just do both enq and deq and move on
        */

        if(isSnakeCellNext) {
            snake.enq(nextCell);
            const deq = snake.deq();
            snakeHead = nextCell;
            return {
                status: 0,
                nextCell,
                deq,
                head: prevHead,
                nextHead: snakeHead
            }
        }

        if(isFoodCellNext) {
            snake.enq(nextCell);
            snakeHead = nextCell;
            return {
                status: 1,
                nextCell,
                head: prevHead,
                nextHead: snakeHead
            }
        }

        snake.enq(nextCell);
        const deq = snake.deq();
        snakeHead = nextCell;
        return {
            status: 2,
            tail: deq,
            head: prevHead,
            nextHead: snakeHead
        }
    };

    function eatFood() {
        score += 1;
        const newFoodPossibilities = allCells.filter(cell => !snake.find(cell));
        const newFood = newFoodPossibilities[Math.floor(Math.random() * newFoodPossibilities.length)];
        food = newFood;
        return food;
    }

    function changeDirection(newDir) {
        if(dir + newDir == 1 || dir + newDir == 5 || dir == newDir) return;

        dir = newDir;
    }

    function resetData() {
        snake = new Queue();
        dir = 1;
        score = 0;
        allCells = [];
    }

    return {
        initData,
        resetData,
        moveSnake,
        getGameDetails,
        eatFood,
        changeDirection
    }
})()

export default data;