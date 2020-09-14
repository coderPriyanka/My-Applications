const gameForm = document.querySelector(".game-form");
const problem = document.getElementById("problem");
const result = document.querySelector(".result");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const message = document.querySelector(".message");
const progressBar = document.querySelector(".progress-bar")
const statusMessage = document.querySelector(".status-message");
const popup = document.querySelector(".popup");
const startOver = document.querySelector(".start-over");
const exit = document.querySelector(".exit");

let gameState = {
    score: 0,
    wrongAnswers: 0
}

gameForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    let expectedResult = evaluateResult(gameState.currentProblem);
    let actualResult = parseInt(result.value, 10);
    console.log("Expected result : " + expectedResult);
    console.log("Actual result : " + actualResult);
    if (expectedResult === actualResult) {
        gameState.score++;
        console.log("Correct answer, good job");
        renderProgressbar();
        createNewProblem();
    }
    else {
        gameState.wrongAnswers++;
        console.log("Wrong answer, try again");
        problem.classList.add("alert-wrong");
        setTimeout(() => problem.classList.remove("alert-wrong"), 501);
    }

    pointsNeeded.textContent = 10 - gameState.score;
    mistakesAllowed.textContent = 3 - gameState.wrongAnswers;
    
    result.value = '';
    result.focus();
    
    checkLogic();
}

function checkLogic() {
    if (gameState.score === 10) {
        console.log("You won");
        statusMessage.textContent = "Congrats, You Won!";
        document.body.classList.add("body-is-open");
        setTimeout(() => startOver.focus(), 331);
    }
    else if (gameState.wrongAnswers === 3) {
        console.log("You lost");
        statusMessage.textContent = "Sorry, you lost!";
        document.body.classList.add("body-is-open");
        setTimeout(() => startOver.focus(), 331);
    }
}

startOver.addEventListener("click", resetGame);

function resetGame() {
    gameState.score = 0;
    gameState.wrongAnswers = 0;
    pointsNeeded.textContent = 10;
    mistakesAllowed.textContent = 3;
    renderProgressbar();
    document.body.classList.remove("body-is-open");
    createNewProblem();
}

exit.addEventListener("click", redirect);

function redirect() {
    location.href = "exit.html";
}

function renderProgressbar() {
    progressBar.style.transform = `scaleX(${gameState.score / 10})`;
}

function createNewProblem() {
    gameState.currentProblem = generateProblem();
    problem.innerHTML = `
        ${gameState.currentProblem.num1} ${gameState.currentProblem.operator} ${gameState.currentProblem.num2}
    `;
}

function generateProblem() {
    return {
        num1: generateRandomNumber(10),
        num2: generateRandomNumber(10),
        operator: [' ', '+', '-', 'X'][generateRandomNumber(3)]
    }
}

function generateRandomNumber(num) {
    return Math.ceil(Math.random() * num);
}

function evaluateResult(problemExpression) {
    if (problemExpression.operator == '+') return parseInt(problemExpression.num1) + parseInt(problemExpression.num2);
    if (problemExpression.operator == '-') return parseInt(problemExpression.num1) - parseInt(problemExpression.num2);
    if (problemExpression.operator == 'X') return parseInt(problemExpression.num1) * parseInt(problemExpression.num2);
}

createNewProblem()