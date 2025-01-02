const pokemonsButton = document.querySelectorAll(".user-pokemons img");
let computerPokemonDOM = document.querySelector(".comp-selected img"),
  userPokemonDOM = document.querySelector(".user-selected img"),
  finalGame = document.querySelector(".final-game"),
  userLifeDOM = document.querySelector(".pokemon-text span"),
  alertMessage = document.querySelector(".alert-message"),
  alertMessageExit = document.querySelector(".alert-message span"),
  alertMessageText = document.querySelector(".alert-message p"),
  alertButtons = document.querySelector(".alert-buttons"),
  startGame = document.querySelector(".start-game"),
  exitGame = document.querySelector(".exit-game"),
  userScoreDOM = document.querySelector(".user-score"),
  computerScoreDOM = document.querySelector(".computer-score");

const computerPokemons = [
  {
    pokemonImage: "./assets/images/fire.png",
    pokemonName: "Fire",
  },
  {
    pokemonImage: "./assets/images/water.png",
    pokemonName: "Water",
  },
  {
    pokemonImage: "./assets/images/electric.png",
    pokemonName: "Electric",
  },
];

const userPokemons = [
  {
    pokemonImage: "./assets/images/fire.png",
    pokemonName: "Fire",
  },
  {
    pokemonImage: "./assets/images/water.png",
    pokemonName: "Water",
  },
  {
    pokemonImage: "./assets/images/electric.png",
    pokemonName: "Electric",
  },
];

function renderPokemons(userPokemonArr) {
  const userPokemonsDOM = document.querySelectorAll(".user-pokemons img");
  userPokemonArr.forEach((pokemon, index) => {
    if (userPokemonsDOM[index]) {
      userPokemonsDOM[index].src = pokemon.pokemonImage;
      userPokemonsDOM[index].alt = pokemon.pokemonName;
      userPokemonsDOM[index].pokemon = pokemon;
    }
  });
}

renderPokemons(userPokemons);

function pokemonGame() {
  let userLife = 5;
  userLifeDOM.innerHTML = userLife;
  let userScore = 0;
  userScoreDOM.innerHTML = userScore;
  let computerScore = 0;
  computerScoreDOM.innerHTML = computerScore;

  startGame.removeEventListener("click", resetGame);
  startGame.addEventListener("click", resetGame);

  exitGame.addEventListener("click", function () {
    window.close();
  });

  function startGaming(params) {
    params.preventDefault();

    finalGame.style.display = "flex";
    alertMessage.style.display = "block";

    alertMessageExit.addEventListener("click", function () {
      alertMessage.style.display = "none";
    });

    let alertTime = setTimeout(() => {
      alertMessage.style.display = "none";
    }, 3000);

    let randomPokemonID = Math.floor(Math.random() * computerPokemons.length),
      userSelectedImg = params.target.pokemon.pokemonImage,
      computerSelectedImg = computerPokemons[randomPokemonID].pokemonImage;

    computerPokemonDOM.src = computerSelectedImg;
    userPokemonDOM.src = userSelectedImg;

    let userSelectPokemonName = params.target.pokemon.pokemonName.toUpperCase(),
      computerSelectPokemonName =
        computerPokemons[randomPokemonID].pokemonName.toUpperCase();

    const fire = "fire",
      water = "water",
      electric = "electric";

    if (userSelectPokemonName == computerSelectPokemonName) {
      alertMessageText.innerText = "Draw!";
      alertTime;
    } else if (
      (userSelectPokemonName == water.toUpperCase() &&
        computerSelectPokemonName == fire.toUpperCase()) ||
      (userSelectPokemonName == fire.toUpperCase() &&
        computerSelectPokemonName == electric.toUpperCase()) ||
      (userSelectPokemonName == electric.toUpperCase() &&
        computerSelectPokemonName == water.toUpperCase())
    ) {
      // ! SCORE ARTMIR!
      // scoreAlertMessage(userScore,userScoreDOM, "You win!");
      userScore++;
      userScoreDOM.innerHTML = userScore;
      alertMessageText.innerText = "You win!";
      alertTime;
      if (userScore == 5) {
        alertMessageText.innerText = "You won the game! Shall we start again?";
        alertButtons.style.display = "block";
        clearTimeout(alertTime);
        pokemonsButton.forEach((item) => {
          item.style.pointerEvents = "none";
        });
      }
    } else {
      userLife--;
      userLifeDOM.innerHTML = userLife;
      // ! SCORE ARTMIR!
      // scoreAlertMessage(computerScore,computerScoreDOM, "You lost a life!");
      computerScore++;
      computerScoreDOM.innerHTML = computerScore;
      alertMessageText.innerText = "You lost a life!";
      alertTime;
      if (userLife <= 0 || computerScore == 5) {
        alertMessageText.innerText = "You lose game! Shall we start again?";
        alertButtons.style.display = "block";
        clearTimeout(alertTime);
        pokemonsButton.forEach((item) => {
          item.style.pointerEvents = "none";
        });
      }
    }
  }

  // ! SCORE ARTMIR!
  // function scoreAlertMessage(scoreElem, scoreDomElem, alertMessage) {
  //   scoreElem++;
  //   scoreDomElem.innerHTML = scoreElem;
  //   alertMessageText.innerText = alertMessage;
  // }

  function resetGame() {
    userLife = 5;
    userLifeDOM.innerHTML = userLife;
    userScore = 0;
    userScoreDOM.innerHTML = userScore;
    computerScore = 0;
    computerScoreDOM.innerHTML = computerScore;
    pokemonsButton.forEach((item) => {
      item.style.pointerEvents = "auto";
    });
    alertMessageExit.style.display = "block";
    alertButtons.style.display = "none";
    alertMessage.style.display = "none";
  }

  pokemonsButton.forEach((item) => {
    item.removeEventListener("click", startGaming);
    item.addEventListener("click", startGaming);
  });
}

pokemonGame();
