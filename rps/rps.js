    // !confetti
function playConfetti(){
let myCanvas = document.createElement('canvas');
document.body.appendChild(myCanvas);

let myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true
});
myConfetti({
    particleCount: 100,
    spread: 160
  // any other options from the global
  // confetti function
});
}


let rounds = 0;
let userScore = 0;
let computerScore = 0;

const userScoreText = document.querySelector(".user-score");
const computerScoreText = document.querySelector(".computer-score");
const winnerText = document.querySelector(".winner-message");
const winnerBlur = document.querySelector(".blur-overall");
const moves = document.querySelectorAll('.moves > img');
moves.forEach(img => img.addEventListener('click', game))

function game(){
    rounds++;
    console.log(rounds);
    const computerMove = computerPlay();
    const userMove = this.className;
    console.log(computerMove);
    console.log(userMove);
    const result = whoWon(computerMove, userMove);
    if (result == 1){
        userScore++;
    }else if(result == -1){
        computerScore++;
    }

    console.log("user score:" + userScore);
    console.log("computer score:" + computerScore);

    userScoreText.textContent = userScore;
    computerScoreText.textContent = computerScore;

    
    displayResult(result, computerMove, userMove);
    
}

function displayResult(result, computerMove, userMove){
    const result_div = document.querySelector(".result");
    const bg_blur = document.querySelector(".blur-round");
    const text = document.querySelector(".outcome");
    const img_user = document.querySelector(".user-choice > img");
    const img_computer = document.querySelector(".computer-choice > img");

    if (result==1){
        text.textContent = "You won this round!";
    } else if (result==0){
        text.textContent = "This round was a draw.";
    } else{
        text.textContent = "Computer won this round!";
    }

    const png_img = ".png";
    img_user.src = userMove.concat(png_img);
    img_computer.src = computerMove.concat(png_img);

    result_div.appendChild(text);
    result_div.style.visibility = "visible";
    bg_blur.style.visibility = 'visible';
    const btn = document.querySelector('button');
    btn.onclick = function () {
        result_div.style.visibility = "hidden";
        bg_blur.style.visibility = 'hidden';
        text.textContent = "";
        if (rounds==5){
            if(userScore > computerScore){
                winnerBlur.style.visibility="visible";
                winnerText.textContent = "YOU WON!";
                playConfetti();
            } else if(userScore < computerScore){
                winnerBlur.style.visibility="visible";
                winnerText.textContent = "COMPUTER WON!";
                playConfetti();
            } else{
                winnerBlur.style.visibility="visible";
                winnerText.textContent = "FRIENDSHIP WON!";
                playConfetti();
            } 
        }
    }
}

function computerPlay(){
    const playMoves = ["rock", "paper", "scissors"];
    return playMoves[Math.floor(Math.random()*3)];
}

function whoWon(computerSelection, playerSelection){
    if (playerSelection == "rock" && computerSelection == "paper") {
        return -1;
    }
    else if (playerSelection == "rock" && computerSelection == "scissors") {
        let result = 1;
        return result;
    }
    else if (playerSelection == "scissors" && computerSelection == "rock") {
        let result = -1;
        return result;
    }
    else if (playerSelection == "scissors" && computerSelection == "paper") {
        let result = 1;
        return result;
    }
    else if (playerSelection == "paper" && computerSelection == "scissors") {
        let result = -1;
        return result;
    }
    else if (playerSelection == "paper" && computerSelection == "rock") {
        let result = 1;
        return result;
    }
    else {
        let result = 0;
        return result;
    }
}