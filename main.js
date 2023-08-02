const btnOptions = Array.from(document.querySelectorAll("[data-option]"));
const chooseMenu = document.querySelector("#chooseMenu");
const menuPlay = Array.from(document.querySelectorAll("[data-btn]"));
const btnOptionsCategory = Array.from(
  document.querySelectorAll("[data-chooseMenu")
);
const continueBtn = document.querySelector("#continueBtn");
const resultBanner = document.querySelector("#result");
const logo = document.querySelector("#logo");
const banner = document.querySelector("#banner");
const ingameMenu = document.querySelector("#ingame");
const questionText = document.querySelector("#questionTextCont");
const resultText = document.querySelector("#resultText");
const soundBtnClick = document.querySelector("#soundBtn")
const soundThemeIngame = document.querySelector("#themeSound")
const ending = document.querySelector("#ending")
const endingContainer = document.querySelector("#endVideoCont")
const gameContainer = document.querySelector("#gameContainer")
const loserSound = document.querySelector("#loser")
const winSound = document.querySelector("#winSound")
const restartMenuEnd = document.querySelector("#restart")
let loseCount = 2;
let result;
let selection;
let optionsSelection;
let correctAnswers;
const QUESTIONS_MATH = [
  "Cuanto es el total entre 456 + 314",
  "El valor final de 567 x 204 es?",
  "Cual es el resultado de la resta de 403 y 104?",
  "Cuanto es 0 elevado a la 0",
];
const btnMathValues = [
  ["864", "745", "770", "823"],
  ["73512", "115668", "129432", "105837"],
  ["195", "299", "87", "312"],
  ["0", "3", "Venezuela", "indeterminado"],
];
/*
const questions = [
  {
    question: "Cuanto es el total entre 456 + 314?",
    answers: [
      {
        label: "850",
        isRightAnswer: false,
      },
      {
        label: "645",
        isRightAnswer: false,
      },
      {
        label: "700",
        isRightAnswer: true,
      },
      {
        label: "701",
        isRightAnswer: false,
      },
    ]
  }
]
const labels = questions[0].answers.map((el) => {
return el.label
})

console.log(labels)
*/

const correctAnswersMath = ["770", "115668", "299", "indeterminado"];
const QUESTIONS_SCIENCE = [
  "Cuantos planetas hay en el sistema solar?",
  "Cual es el planeta mas grande del sistema solar?",
  "Cual es el radio de la tierra?",
];
const btnScienceValues = [
  ["4", "7", "10", "8"],
  ["La Tierra", "Jupiter", "Venezuela", "Saturno"],
  ["3.800km", "6.371km", "8.654km", "1.437km"],
];
const correctAnswersScience = ["8", "Jupiter", "6.371km"];

const QUESTIONS_CULTURE = [
  "Cual es el rio mas largo del mundo?",
  "Donde queda transilvania?",
  "Pais con menos habitantes del mundo?",
];
const btnCultureValues = [
  ["El Orinoco", "El Rio Nilo", "Rio Amazonas", "Rio Misisipi"],
  ["Pensilvania", "Argentina", "Rumania", "Islandia"],
  ["Honduras", "Colombia", "Ghana", "La Ciudad del Vaticano"]
];
const correctAnswersCulture = [
  "Rio Amazonas",
  "Rumania",
  "La Ciudad del Vaticano",
];
function themePlay (){
  soundThemeIngame.currentTime=0;
  soundThemeIngame.volume = 0.8
  soundThemeIngame.play()
}

function soundBtnFunction(){
  soundBtnClick.currentTime=0;
  soundBtnClick.volume= 1

  soundBtnClick.play()
}


restartMenuEnd.addEventListener("click", ()=> location.reload())
continueBtn.addEventListener("click", nextLvl);
menuPlay[1].addEventListener("click", () => {
  soundBtnFunction()
  menuPlay[0].classList.add("inactive");
  chooseMenu.classList.remove("inactive");
  console.log("sirvio");
});

btnOptionsCategory.forEach((btn) => {
  btn.addEventListener("click", () => {
    soundBtnFunction()
    chooseMenu.classList.add("inactive");
    logo.classList.add("inactive");
    banner.classList.remove("inactive");
    ingameMenu.classList.remove("inactive");
    playGame(btn.innerText);
  });
});

function playGame(optionSelected) {
  function valuesCategory(select, options, correctAnswersSelection) {
    selection = select;
    optionsSelection = options;
    correctAnswers = correctAnswersSelection;
  }

  if (optionSelected === "MATEMATICAS") {
    themePlay()
    valuesCategory(QUESTIONS_MATH, btnMathValues, correctAnswersMath);
    startLvl(selection, optionsSelection);
  }

  btnOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      soundBtnFunction()
      if (btn.innerText === correctAnswers[0]  ) {
        isRightAnswer();
      } else {
        isIncorrectAnswer();
      }
    });
  });

  if (optionSelected === "CIENCIA") {
    themePlay()
    console.log(`hola soy ${optionSelected}`);
    valuesCategory(QUESTIONS_SCIENCE, btnScienceValues, correctAnswersScience);
    startLvl(selection, optionsSelection);
  }

  if (optionSelected === "CULTURA") {
    themePlay()
    console.log(`hola soy ${optionSelected}`);
    valuesCategory(QUESTIONS_CULTURE, btnCultureValues, correctAnswersCulture);
    startLvl(selection, optionsSelection);
    
  }
}

function nextLvl() {
  winSound.pause()
  loserSound.pause()
  soundThemeIngame.currentTime=0
  soundThemeIngame.play()
  

  if (loseCount === 0) {
   location.reload()
    
    
    return;
  }
  if (result && selection.length === 1) {
    loserSound.pause()
    soundThemeIngame.pause()
    winSound.pause()
    gameContainer.classList.add("inactive")
    endingContainer.classList.remove("inactive")
    ending.currentTime=0
    ending.volume= 0.5
    ending.play()    
    return;
  }

  if(!result) {
    console.log(`Soy ${result}`);
    ingameMenu.classList.remove("inactive")
    resultBanner.classList.add("inactive");
    return;
    
  }
  
  
  if (result) {
    console.log(`soy ${result}`);
    correctAnswers.shift();
    optionsSelection.shift();
    selection.shift();
    resultBanner.classList.add("inactive");
    ingameMenu.classList.remove("inactive")
    questionText.textContent = selection[0];
    for (var i = 0; i < btnOptions.length; i++) {
      btnOptions[i].textContent = optionsSelection[0][i];
    }
  }
   
  
}
function startLvl(selected, options) {
  soundBtnFunction()
  questionText.textContent = selected[0];
  for (var i = 0; i < btnOptions.length; i++) {
    btnOptions[i].textContent = options[0][i];
  }
}
function isRightAnswer() {
  loseCount = 3;
  soundThemeIngame.pause()
  winSound.currentTime=0.8
  winSound.play()
  resultBanner.classList.remove("inactive");
  ingameMenu.classList.add("inactive")
  resultText.textContent = "Has acertado, Felicidades!";
  result = true;
}
function isIncorrectAnswer() {
  
  
  loseCount-=1
  resultBanner.classList.remove("inactive");
  soundThemeIngame.pause()
  loserSound.currentTime=0
  loserSound.play()
  ingameMenu.classList.add("inactive")
  resultText.textContent = `Te quedan ${loseCount} intentos`;
  result = false;

  if (loseCount === 0) {
    loserSound.currentTime=0
    loserSound.volume=1
    soundThemeIngame.pause()

    loserSound.play()
    resultText.textContent = `Has perdido, vuelve a la prepa`;

  }
}
