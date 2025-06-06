let cells = document.querySelectorAll('.cell');
let turnIndicator = document.querySelector('.turnIndicator');
let resetButton = document.querySelector('.resetButton');
let playAgainButton = document.querySelector('.playAgainButton');

let tingAudio = new Audio('./Music/ting.mp3');
let gameOverAudio = new Audio('./Music/gameover.mp3');

let turn = 'X';
let winner = null;

resetButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.innerHTML = '';
    })
    turn = 'X';
    turnIndicator.innerHTML = `Turn for ${turn}`;
    winner = null;
});

playAgainButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.innerHTML = '';
    })
    showResult();
    turn = 'X';
    turnIndicator.innerHTML = `Turn for ${turn}`;
    winner = null;
});

function showResult() {
    let resultContainer = document.querySelector('.resultContainer');
    let result = document.querySelector('.result');
    if(winner) result.innerHTML = `${winner} won the Game!`;
    else result.innerHTML = `It's a Draw!`;
    (resultContainer.style.display === 'flex') ? resultContainer.style.display = 'none' : resultContainer.style.display = 'flex';
}

function checkWinner(){
    let winConditions = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8], 
        [0,4,8],[2,4,6]
    ]
    winConditions.forEach(condition => {
        let idx0 = condition[0];
        let idx1 = condition[1];
        let idx2 = condition[2];
        let val0 = cells[idx0].innerHTML;
        let val1 = cells[idx1].innerHTML;
        let val2 = cells[idx2].innerHTML;
        if (val0 === val1 && val1 === val2 && val0 !== '') {
            winner = val0;
        }
    })
    if(winner){
        turnIndicator.innerHTML = `${winner} is the winner!`;
        gameOverAudio.play();
        showResult();
    }
}

function checkDraw() {
    let isDraw = true;
    cells.forEach(cell => {
        if (cell.innerHTML === '') {
            isDraw = false;
        }
    });
    if(isDraw && !winner){
        turnIndicator.innerHTML = `It's a Draw!`;
        gameOverAudio.play();
        showResult();
    }
}

cells.forEach(cell => {
    cell.addEventListener('click',(e) => {
        if(e.target.innerHTML === '') {
            e.target.innerHTML = turn;
            tingAudio.play();
            turn = turn === 'X' ? 'O' : 'X';
            turnIndicator.innerHTML = `Turn for ${turn}`;
            checkWinner();
            checkDraw();
        }
    })
})