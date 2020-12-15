myQuestions = [
  {
    title: 'Who is capital of Albania ?',
    qst: [
      {
        op1: 'Tirana',
        op2: 'Durresi',
        op3: 'Vlora',
        op4: 'Shkupi',
      },
    ],
    correct: 'Tirana',
  },
  {
    title: 'Who is capital of Kosova ?',
    qst: [
      {
        op1: 'Gjakova',
        op2: 'Prishtina',
        op3: 'Ferizaj',
        op4: 'Gjilani',
      },
    ],
    correct: 'Prishtina',
  },
  {
    title: 'Who is capital of Germany ?',
    qst: [
      {
        op1: 'Munchen',
        op2: 'Berlin',
        op3: 'Stuttgart',
        op4: 'Dortmund',
      },
    ],
    correct: 'Berlin',
  },
  {
    title: 'Who is capital of Croatia ?',
    qst: [
      {
        op1: 'Bratislava',
        op2: 'Zagreb',
        op3: 'Beograd',
        op4: 'Sarajeva',
      },
    ],
    correct: 'Zagreb',
  },
  {
    title: 'Who is capital of Austria ?',
    qst: [
      {
        op1: 'Salzburg',
        op2: 'Linz',
        op3: 'Graz',
        op4: 'Viena',
      },
    ],
    correct: 'Viena',
  },
  {
    title: 'Who is capital of Swis ?',
    qst: [
      {
        op1: 'Bern',
        op2: 'Zurich',
      },
    ],
    correct: 'Bern',
  },
];

// const lists = document.querySelectorAll('.option');
const nextBtn = document.querySelector('.next');
const answers = document.querySelector('.answers');
const titleDiv = document.querySelector('.question');
const finish = document.querySelector('.finish');
const startModal = document.querySelector('#start-modal');
const startModalBtn = document.querySelector('#start-btn');
const finishModal = document.querySelector('#finish-modal');
const second = document.querySelector('.second');
const quizBox = document.querySelector('.quiz-box');

let quesNum = 0;
let correct = 0;
let correctAnsw = [];
let sec = 10;
let btnClicked = false;
let answClicked = false;
let interval;

// shuffle question
let randomQuestion = [...myQuestions].sort(() => {
  return Math.random() - 0.5;
});

/* start modal  */
const numOfQues = document.querySelector('#ques-num');
numOfQues.innerText = myQuestions.length;

const numOfSec = document.querySelector('#sec-num');
numOfSec.innerText = sec;
/* start modal  */

/* FUNCTIONS */

function start() {
  quesNum = 0;
  correct = 0;
  correctAnsw = [];

  sec = 10;
  btnClicked = false;
  answClicked = false;

  firstTitle(randomQuestion);
  firstQuestion(randomQuestion);

  countSec();

  answers.addEventListener('click', clickHandler);

  startModal.style.display = 'none';
  quizBox.style.display = 'block';
}

function clickHandler(e) {
  if (e.target.classList.contains('option')) {
    const targetValue = e.target.textContent;

    if (
      targetValue.toLowerCase() ===
      randomQuestion[quesNum].correct.toLowerCase()
    ) {
      e.target.classList.add('correct');
      win();
      answClicked = true;
      if (answClicked) {
        answers.removeEventListener('click', clickHandler);
      }
    } else {
      e.target.classList.add('wrong');
      lose();
      answClicked = true;
      if (answClicked) {
        answers.removeEventListener('click', clickHandler);
      }
    }
  }
}

function win() {
  correct++;
  correctAnsw.push(randomQuestion[quesNum].correct);
  disabledBtn();
}

function lose() {
  const lists = document.querySelectorAll('.option');

  lists.forEach((list) => {
    if (list.textContent === randomQuestion[quesNum].correct) {
      list.classList.add('correct');
    }
  });

  disabledBtn();
}

function disabledBtn() {
  nextBtn.disabled = false;

  if (quesNum === myQuestions.length - 1) {
    finish.disabled = false;
    nextBtn.disabled = true;
  }
}

function firstQuestion(question) {
  let findQuestion = question.find((item) => item === question[quesNum]);

  let ItemFound = findQuestion.qst.map((item) => {
    return item;
  });

  let items = Object.values(ItemFound[0]);

  let showItem = items
    .map((item) => {
      return `<li class='option'>${item}</li>`;
    })
    .join('');

  answers.innerHTML = showItem;
  nextBtn.disabled = true;
  finish.disabled = true;
}

function firstTitle(question) {
  let showTitle = `
    <h1>${question[quesNum].title}</h1>
    `;
  titleDiv.innerHTML = showTitle;
}

function modalText(modaltxt) {
  const correctA = document.querySelector('#correctA');
  if (correct > 1) {
    correctA.innerText = `${correct} correct answers`;
  } else {
    correctA.innerText = `${correct} correct answer`;
  }
  correctAnsw.forEach((ca) => (modaltxt.innerHTML += `<li>${ca}</li>`));
}

function countSec() {
  let mySec = sec;
  second.innerText = mySec;

  interval = setInterval(() => {
    if (!answClicked) {
      mySec -= 1;
      second.innerText = mySec;
    }

    if (mySec === 0) {
      clearInterval(interval);

      const myList = [...document.querySelectorAll('.option')];

      let findList = myList.find(
        (list) => list.textContent === randomQuestion[quesNum].correct
      );
      myList.forEach((list) => {
        if (findList.textContent !== list.textContent) {
          list.classList.add('wrong');
          findList.classList.add('correct');
          nextBtn.disabled = false;

          disabledBtn();
        }
      });
    }
  }, 1000);
}

/* Event Listeners */

startModalBtn.addEventListener('click', function () {
  start();
});

nextBtn.addEventListener('click', function () {
  if (quesNum === myQuestions.length - 2) {
    nextBtn.disabled = true;
  }
  quesNum++;
  firstTitle(randomQuestion);
  firstQuestion(randomQuestion);

  btnClicked = true;
  answClicked = false;
  answers.addEventListener('click', clickHandler);
  clearInterval(interval);
  countSec();
});

finish.addEventListener('click', function () {
  finishModal.style.display = 'block';
  clearInterval(interval);

  const modalTxt = finishModal.querySelector('.modal-text ul');
  modalText(modalTxt);

  const closeModal = finishModal.querySelector('.modal-opacity');
  closeModal.addEventListener('click', () => {
    finishModal.style.display = 'none';
    modalTxt.textContent = '';

    startModal.style.display = 'block';
  });
});
