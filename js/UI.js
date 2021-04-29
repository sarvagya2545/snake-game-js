export default(function(){
    const board = document.querySelector('#board');
    const r = document.querySelector(':root');
    const score = document.querySelector('#score span')
    const boardSquareSize = 20;

    // x -> columns, y -> rows
    function generateBoard(x = boardSquareSize, y = boardSquareSize) {
        if(x > boardSquareSize || y > boardSquareSize) return alert('Board size limit exceeded');
        const grid = document.createElement('div');
        grid.classList.add('board-grid');
        r.style.setProperty('--columns', y);

        for(let i = 0; i < x; i++) {
            for(let j = 0; j < y; j++) {
                grid.appendChild(createCell(i,j));
            }
        }

        board.appendChild(grid);
    }

    function genSnakeHead([x,y]) {
        // Generate Snake
        document.querySelector(`.cell.grid-${x}-${y}`).classList.add('snake-head');
    }

    function genFoodItem([x,y]) {
        // Generate Food Item
        document.querySelector(`.cell.grid-${x}-${y}`).classList.add('food');
    }

    function createCell(x,y) {
        const div = document.createElement('div');
        div.className = `cell grid-${x}-${y}`;
        // for testing
        // div.innerHTML = `${x}-${y}`;
        return div;
    }

    function moveSnake(head, nextHead, tail, removeTail) {
        // console.log(head, nextHead, tail);
        const [headX, headY] = head;
        const [newHeadX, newHeadY] = nextHead;
        
        // add the new head
        document.querySelector(`.cell.grid-${newHeadX}-${newHeadY}`).classList.add('snake-head');
        
        // remove the previous head
        document.querySelector(`.cell.grid-${headX}-${headY}`).classList.remove('snake-head');
        document.querySelector(`.cell.grid-${headX}-${headY}`).classList.add('snake');
        
        // remove the tail
        if (removeTail) {
            const [tailX, tailY] = tail;
            document.querySelector(`.cell.grid-${tailX}-${tailY}`).classList.remove('snake');
        }
    }

    function removeFood([x,y]) {
        document.querySelector(`.cell.grid-${x}-${y}`).classList.remove('food');
    }

    function incScore() {
        score.innerHTML = parseInt(score.innerText) + 1
    }

    return {
        generateBoard,
        genSnakeHead,
        genFoodItem,
        moveSnake,
        removeFood,
        incScore
    }
})();