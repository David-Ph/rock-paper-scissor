let allHands = ["rock", "paper", "scissor"];
let header = document.querySelector(".page-header h1");
let resetBtn = document.querySelector(".reset-btn");

let opponentPlays;
let playerChoice;

function playGame(callback, next, anotherNext){
	let allPlays = document.querySelectorAll(".player .hands img");
	let playerChoices;

	for(let i = 0; i < allPlays.length; i++){

		allPlays[i].addEventListener("click", function(){
			playerChoices = this;
			allPlays.forEach(function(element){
				if(element !== playerChoices){
					element.style.display = 'none';
				}else{
					playerChoice = allHands[i];
				}
				callback();
				next(playerChoice, opponentPlays);
				anotherNext();
			})
		});
	}
}

function opponentRandoms(){
	let random = Math.floor(Math.random() * 3);
	opponentPlays = allHands[random];
	document.querySelector(".random img").setAttribute("src", "img/" + opponentPlays + ".png");
}

function checkWinner(player, opponent){
	if(player === opponent){
		header.textContent = "It was a tie!";
	}else if(
		(player === "rock" && opponent === "scissor") ||
		(player === "paper" && opponent === "rock") ||
		(player === "scissor" && opponent === "paper")
		){
		header.textContent = "Player wins!";
	}else{
		header.textContent = "Opponent Wins!";
	}
}

function revealResetBtn(){
	resetBtn.style.visibility = "visible";
}

resetBtn.addEventListener("click", function(){
	location.reload();
});

playGame(opponentRandoms, checkWinner, revealResetBtn);