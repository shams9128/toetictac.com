console.log("Welcome To Tic Tac Toe!");
let music = new Audio("music.mp3");
let audioturn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;
let gameMode = "multiplayer"; // Start in multiplayer mode
let computerPlayer = "O";

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
  let boxtext = Array.from(document.getElementsByClassName("boxtext"));
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won";
      isgameover = true;
      document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "180px";
      document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";
    }
  });
};

// Game Logic
 //music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", (e) => {
    if (boxtext.innerText === "" && !isgameover) {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioturn.play();
      checkWin();

      if (!isgameover && gameMode === "computer") {
        document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
        computerMove();
      }
    }
  });
});

// Reset Button
let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0px";
  document.querySelector(".line").style.width = "0vw";
});

// Play with Computer Button
const playWithComputerButton = document.getElementById("playWithComputer");
playWithComputerButton.addEventListener("click", () => {
  gameMode = "computer";
  document.getElementsByClassName("info")[0].innerText = "Game Mode: Play with Computer";
  // Reset the board and start a new game
  let boxtexts = document.querySelectorAll('.boxtext');
  Array.from(boxtexts).forEach(element => {
    element.innerText = "";
  });
  turn = "X"; // Start with X
  isgameover = false; // Reset game over state
  document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
  document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
  document.querySelector(".line").style.width = "0vw";
});

// Multiplayer Button
const multiplayerButton = document.getElementById("multiplayer");
multiplayerButton.addEventListener("click", () => {
  gameMode = "multiplayer";  // Set the game mode to multiplayer
  document.getElementsByClassName("info")[0].innerText = "Game Mode: Multiplayer";

  // Reset the board and start a new multiplayer game
  let boxtexts = document.querySelectorAll('.boxtext');
  Array.from(boxtexts).forEach(element => {
    element.innerText = "";  // Clear the board
  });
  
  turn = "X"; // Start with player X
  isgameover = false; // Reset game over state
  document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
  document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
  document.querySelector(".line").style.width = "0vw";
});

// Computer Move
const computerMove = () => {
  let boxtext = Array.from(document.getElementsByClassName("boxtext"));
  let emptySpaces = boxtext.map((space, index) => (space.innerText === "" ? index : null)).filter((space) => space !== null);

  if (emptySpaces.length > 0) {
    let randomIndex = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
    boxtext[randomIndex].innerText = computerPlayer;
    turn = "X"; // After computer's move, it's player's turn
    checkWin();
  }
};
