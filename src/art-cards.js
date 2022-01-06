import { fullImageSet } from './image-set';
import { images } from './assets/images';
import { getContent, artistsPage } from '.';
import { volumeBar, timeLimit } from './settings';
import correct from './assets/sounds/correct.mp3';
import fail from './assets/sounds/fail.mp3';
import quizEnd from './assets/sounds/quiz.mp3';

let correctSound = new Audio(correct);
let failSound = new Audio(fail);
let quizEndSound = new Audio(quizEnd);
const navCategoryArt = document.querySelector('.nav-category-art');

navCategoryArt.addEventListener('click', backToCategoryArt);

function backToCategoryArt() {
  clearInterval(intervalId_Art);
  getContent('artists');
}

export function playCorrect() {
  correctSound.volume = volumeBar.value;
  correctSound.play();
}

export function playFail() {
  failSound.volume = volumeBar.value;
  failSound.play();
}

export function playQuizEnd() {
  quizEndSound.volume = volumeBar.value;
  quizEndSound.play();
}

export const artQuizCard = document.getElementById('art-quiz-card'); // to set Hide or Not
export const art_Answer = document.querySelectorAll('.art-answer'); // get the pool of answer divs

const authorSet = [...new Set(images.map((item) => item.author))]; // unique Author set

export function getAuthorByNum(num) {
  return images
    .filter((item) => item.imageNum === num.toString())
    .map((item) => item.author)[0];
}
export function getNameByNum(num) {
  return images
    .filter((item) => item.imageNum === num.toString())
    .map((item) => item.name)[0];
}
export function getYearByNum(num) {
  return images
    .filter((item) => item.imageNum === num.toString())
    .map((item) => item.year)[0];
}

let imageNum_Art = 1;
let randomImage = imageNum_Art;
let dynamicAuthorSet = [...authorSet];
let answerSet_Art = [];
let categorySetNumber = 1;

export function startArtQuiz(num) {
  imageNum_Art = num * 10 + 1;
  // console.log(imageNum_Art);
  artQuizCard.classList.remove('hide');
  artistsPage.classList.add('hide');
  drawArtCard(imageNum_Art);
  art_score = 0;
  categorySetNumber = num + 1;
  // console.log((imageNum_Art - 1) / 10 + 1) // get the number of category Quiz 1-12
}

// get the set of 4 unique artists, including the one who created the picture in the question
const getAnswerSet_Art = function () {
  dynamicAuthorSet = [...authorSet]; // by the end on this function the Set would be cut, so should REcreate it before
  console.log(dynamicAuthorSet);
  // console.log(randomImage);
  // console.log(imageNum_Art);
  answerSet_Art = [];
  answerSet_Art.push(getAuthorByNum(imageNum_Art));
  dynamicAuthorSet.splice(
    dynamicAuthorSet.indexOf(getAuthorByNum(randomImage)),
    1
  );

  console.log(`${randomImage} - ${getAuthorByNum(randomImage)}`);
  console.log(`${imageNum_Art} - ${getAuthorByNum(imageNum_Art)}`);

  for (let i = 0; i < 3; i++) {
    console.log(dynamicAuthorSet);
    randomImage = getRandom(dynamicAuthorSet.length - 1);

    console.log(`${randomImage} - ${dynamicAuthorSet[randomImage]}`);

    answerSet_Art.push(dynamicAuthorSet[randomImage]);
    dynamicAuthorSet.splice(
      dynamicAuthorSet.indexOf(dynamicAuthorSet[randomImage]),
      1
    );
  }
  answerSet_Art = answerSet_Art.sort();
  console.log(answerSet_Art);
};
// getAnswerSet_Art();

export function getRandom(num) {
  return Math.round(Math.random() * num);
}

const timerProgressArt = document.getElementById('art-timer-progress');
const timerBoxArt = document.getElementById('art-timer');
let intervalId_Art; // Timer setinterval variable to stop it
let artCardItem;

class ArtCard {
  constructor(author, name, year, num) {
    this.author = author;
    this.name = name;
    this.year = year;
    this.num = num;
  }
}

const artTimerVisibility = document.getElementById('art-quiz-timer');

function drawArtCard(num) {
  artCardItem = new ArtCard(
    getAuthorByNum(num),
    getNameByNum(num),
    getYearByNum(num),
    num
  );
  setPictureToArtCard();
  setTimeout(() => {
    drawArtCardAnswers();
  }, 500);
  if (localStorage.getItem('timeOn') === 'true') {
    updateProgressBarArt(+timeLimit.innerHTML);
    artTimerVisibility.style.visibility = 'visible';
  } else {
    artTimerVisibility.style.visibility = 'hidden';
  }
}
// drawArtCard(imageNum_Art);

function drawArtCardAnswers() {
  getAnswerSet_Art();
  for (let i = 0; i < art_Answer.length; i++) {
    art_Answer[i].innerHTML = answerSet_Art[i];
    art_Answer[i].addEventListener('click', checkAnswer_Art);
  }
}

function setPictureToArtCard() {
  const picturePlace = document.querySelector('.art-image');
  picturePlace.innerHTML = `<img class="art-image-pic" src="src/assets/img/full/${imageNum_Art}full.webp" alt="question picture">`;
}

const artResultCheck = document.querySelector('.art-result-check');
const artResultSection = document.querySelector('.art-card-result-section');

let art_score = 0;
const artQuizScore = document.querySelector('.art-quiz-score');

function checkAnswer_Art(e) {
  artResultSection.style.left = 0;
  artResultSection.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  drawArtResult();
  // console.log(answerSet_Art)
  if (e.target.innerHTML === artCardItem.author) {
    artResultCheck.innerHTML = `<img src="src/assets/img/svg/true.png" alt="true-false icon">`;
    playCorrect();
    art_score++;
    // console.log('Bravo!');
  } else {
    artResultCheck.innerHTML = `<img src="src/assets/img/svg/false.png" alt="true-false icon">`;
    playFail();
    // console.log('Ups...')
  }

  clearInterval(intervalId_Art);
}

function checkTimeOverAnswer_Art() {
  artResultSection.style.left = 0;
  artResultSection.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  drawArtResult();
  playFail();
  artResultCheck.innerHTML = `<img src="src/assets/img/svg/false.png" alt="true-false icon">`;
  clearInterval(intervalId_Art);
}

const resultImageBox = document.querySelector('.art-card-result-pic-box');
const resultName = document.querySelector('.art-result-name');
const resultAuthorYear = document.querySelector('.art-result-author-year');

function drawArtResult() {
  resultImageBox.innerHTML = `<img class="art-card-result-pic" src="src/assets/img/crop/${imageNum_Art}.webp"" alt="result picture">`;
  resultName.innerHTML = artCardItem.name;
  resultAuthorYear.innerHTML = `${artCardItem.author}, ${artCardItem.year}`;
}

const nextArtCard = document.querySelector('.art-result-next');
const backArtMenu = document.querySelector('.art-quiz-back');
const artQuizResult = document.querySelector('.art-quiz-result-section');
const artCongrats = document.querySelector('.art-congrats');

nextArtCard.addEventListener('click', nextArt);
backArtMenu.addEventListener('click', endArtQuiz);

function nextArt() {
  // const categorySetNumber = imageNum_Art;
  artResultSection.style.left = '-100%';
  artResultSection.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  if (!(imageNum_Art % 10)) {
    playQuizEnd();
    artQuizResult.style.left = 0;
    artQuizResult.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    artQuizScore.innerHTML = `${art_score} / 10`;
    if (art_score < 5) {
      artCongrats.innerHTML = 'Вы можете лучше!';
    } else if (art_score < 8) {
      artCongrats.innerHTML = 'Вы разбираетесь в Живописи!';
    } else {
      artCongrats.innerHTML = 'Поздравляем!';
    }
    // localStorage.setItem(`art${(imageNum_Art - 1) / 10 + 1}`, art_score); // save the score fot this category set
    localStorage.setItem(`art${categorySetNumber}`, art_score); // save the score fot this category set
    console.log(localStorage.getItem(`art${categorySetNumber}`));
  } else {
    imageNum_Art++;
    drawArtCard(imageNum_Art);
    // console.log(dynamicAuthorSet)
    // console.log(imageNum_Art)
  }
}
// console.log(`art${(categorySetNumber - 1) / 10 + 1}`)
// console.log(localStorage.getItem('art1.9'))

function endArtQuiz() {
  artQuizResult.style.left = '-100%';
  artQuizResult.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  getContent('artists');
}

// Timer

export function formatTime(duration) {
  let minute = Math.trunc(duration / 60);
  let second = Math.ceil(duration - minute * 60); // 'ceil' stops exactly at the beginning of the second 0:00, 'trunc' - at the end
  second = second.toString().padStart(2, 0);
  return `${minute}:${second}`;
}

function updateProgressBarArt(timer) {
  timerBoxArt.innerHTML = formatTime(timer);
  let timePosition = timer * 1000;
  timerProgressArt.max = timer * 1000;
  intervalId_Art = setInterval(() => {
    if (timePosition === 0) {
      clearInterval(intervalId_Art);
      checkTimeOverAnswer_Art();
    } else {
      timerProgressArt.value = timePosition;
      timePosition -= 10;
      timerBoxArt.innerHTML = formatTime(timePosition / 1000);
    }
  }, 10);
}

const nameSet = [];

function getNames() {
  for (let i = 0; i < images.length; i++) {
    if (!nameSet.includes(images[i].author)) {
      nameSet.push(images[i].author);
    }
  }
}

// getNames();
// console.log('checkSet');
// console.log(nameSet);
