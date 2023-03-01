const boxElements = document.querySelectorAll("[databox]");
const board = document.querySelector("[databoard]");
const winningMessageTextElement = document.querySelector("[datapwinner]");
const winningMessage = document.querySelector("[datawinnerm]");
const restartButton = document.querySelector("[datarestartb]");


let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    board.classList.remove("circle");
    board.classList.add("x");
    
    for (const box of boxElements) {
        box.classList.remove("circle");
        box.classList.remove("x");
        box.addEventListener("click", handleClick, { once: true });
    }

    isCircleTurn = false;

    winningMessage.classList.remove("showwinnerm");
};

const endGame = (isDraw) => {
     if (isDraw) {
        winningMessageTextElement.innerText = "Empate!";
     } else {
        winningMessageTextElement.innerText = isCircleTurn 
        ? "O Venceu!" 
        : "X Venceu!";
     }

    winningMessage.classList.add("showwinnerm");
};


const checkForWin = (currenClass) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return boxElements[index].classList.contains(currenClass);
        });
    });
};

const checkForDraw = () => {
    return [ ... boxElements].every((box) => { 
        return box.classList.contains("x") || box.classList.contains("circle");
    })
}


const placeMark = (box, classToAdd) => {
    box.classList.add(classToAdd);
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
};

const handleClick = (e) => {
    // colocar marca (x ou circle)
    const box = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(box, classToAdd);
    
    // verificar por vitória
    const isWin = checkForWin(classToAdd);
    

    // verificar por empate
    const isDraw = checkForDraw();
    
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        // mudar o símbolo
    swapTurns();
    }
};

startGame();

restartButton.addEventListener("click", startGame);