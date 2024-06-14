const gameCells= document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartbtn = document.querySelector('.restartbtn');
const alertBox = document.querySelector('.alertBox');

let currentPlayer ='X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent =`Player 1: ${currentPlayer}`;
player2.textContent =`Player 1: ${nextPlayer}`;
const startGame = () => {
    gameCells.forEach(cell =>{
       cell.addEventListener('click',handleClick) 
    })
}

const handleClick = (e) => {
    if(e.target.textContent === ''){
        e.target.textContent = playerTurn;
        if (checkWin()) {
            //console.log(`${playerTurn} is a winner`);
            showAlert(`${playerTurn} is a winner`);
            disableCells();
        }
        else if(checkTie()){
            //console.log(`It's a Tie`);
            showAlert(`It's a Tie`);
            disableCells();
        }else{
            changePlayerTurn();
            showAlert(`Turn for player: ${playerTurn} `);

        }
    }

}

const changePlayerTurn = () => {
    if(playerTurn === currentPlayer){
        playerTurn = nextPlayer;
    }
    else{
        playerTurn = currentPlayer;
    }
}

const checkWin = () => {
    const winningConditions =
    [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];
        console.log('${pos1} ${pos2} ${pos3}');
        if(gameCells[pos1].textContent !=='' && 
           gameCells[pos1].textContent === gameCells[pos2].textContent && 
           gameCells[pos2].textContent === gameCells[pos3].textContent){
           return true;
           }
    }
    return false;
}
 const checkTie = () => {
    let emptycellscount = 0;
    gameCells.forEach(cell => {
        if (cell.textContent === ''){
            emptycellscount++;
        }
    }) ;

    return emptycellscount === 0 && !checkWin();
 }

 const disableCells= () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick );
        cell.classList.add('disable');
    })
 }
 const restartGame = ()=> {
    gameCells.forEach(cell =>{
        cell.textContent= '';
        cell.classList.remove('disable');
    });
    startGame();
 }
 const showAlert = (msg) => {
    alertBox.style.display = "block";
    alertBox.textContent = msg;
    setTimeout(()=> {
            alertBox.style.display="none";
    },5000);
 }
 restartbtn.addEventListener('click', restartGame);
startGame();
