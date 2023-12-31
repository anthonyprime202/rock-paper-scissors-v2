function getScore () {
  let scores = localStorage.getItem('score')
  if (scores) {
    return JSON.parse(scores);
  } else {
    return {
      wins: 0,
      losses: 0,
      ties: 0,
    }
  }
}

function updateScores(result) {
  let scores = getScore();
  if (result) {
    scores[result]++;
  }
  document.querySelector("#wins").innerHTML = scores.wins;
  document.querySelector("#ties").innerHTML = scores.ties;
  document.querySelector("#losses").innerHTML = scores.losses;
  localStorage.setItem("score", JSON.stringify(scores));
}


function changeUsername() {
  value = document.querySelector('.username-input').value
  if (value.length <= 4) 
    document.querySelector('#you>.name').innerHTML =  value;
}

updateScores();

function comChoiceSelector() {
  let rawChoice = Math.random();
  if (0 <= rawChoice && rawChoice < 1 / 3) {
    return "✊";
  } else if (1 / 3 <= rawChoice && rawChoice < 2 / 3) {
    return "🖐️";
  } else {
    return "✌️";
  }
}

function updateResult(userChoice, comChoice, result) {
  document.querySelector("#you .choice").innerHTML = userChoice;
  document.querySelector("#com .choice").innerHTML = comChoice;
  document.querySelector(".result").innerHTML = result;
  document.querySelector(".result").classList.remove('no-display', 'green-bg', 'red-bg', 'yellow-bg')
  if (result === 'You win!') {
    document.querySelector(".result").classList.add('green-bg')
  } else if (result === 'You lose!') {
    document.querySelector(".result").classList.add('red-bg')
  } else {
    document.querySelector(".result").classList.add('yellow-bg')
  }
}

function evaluateChoice(userChoice) {
  comChoice = comChoiceSelector();
  if (comChoice === userChoice) {
    updateResult(userChoice, comChoice, "It's a tie");
    updateScores("ties");
  } else if (comChoice === "✊" && userChoice === "🖐️") {
    updateResult(userChoice, comChoice, "You win!");
    updateScores("wins");
  } else if (comChoice === "" && userChoice === "✊") {
    updateResult(userChoice, comChoice, "You win!");
    updateScores("wins");
  } else if (comChoice === "🖐️" && userChoice === "✌️") {
    updateResult(userChoice, comChoice, "You win!");
    updateScores("wins");
  } else if (comChoice === "✊" && userChoice === "✌️") {
    updateResult(userChoice, comChoice, "You lose!");
    updateScores("losses");
  } else if (comChoice === "✌️" && userChoice === "🖐️") {
    updateResult(userChoice, comChoice, "You lose!");
    updateScores("losses");
  }
}

function resetScore() {
  localStorage.removeItem("score");
  updateScores();
}
