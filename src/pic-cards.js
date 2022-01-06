import { fullImageSet } from './image-set';
import { images } from './assets/images';
import { getContent, picturePage } from '.';
import { timeLimit } from './settings';
import {
  getAuthorByNum,
  getNameByNum,
  getYearByNum,
  getRandom,
  formatTime,
  playFail,
  playCorrect,
  playQuizEnd,
} from './art-cards';

export const picQuizCard = document.getElementById('pic-quiz-card'); // to set HIDE or NOT
export const pic_Answer = document.querySelectorAll('.pic-answer'); // get the pool of answer divs
const navCategoryPic = document.querySelector('.nav-category-pic');

navCategoryPic.addEventListener('click', backToCategoryPic);

function backToCategoryPic() {
  clearInterval(intervalId_Pic);
  getContent('picture');
}

let imageNum_Pic = 203;
let randomPicture = imageNum_Pic;
let dynamicPictureSet = [];
let answerSet_Pic = []; // Set of 4 picture Numbers for card answers
let categorySetNumberPic = 1;

export function startPictureQuiz(num) {
  imageNum_Pic = num * 10 + 121;
  // console.log(imageNum_Pic);
  picQuizCard.classList.remove('hide');
  picturePage.classList.add('hide');
  drawPicCard(imageNum_Pic);
  pic_score = 0;
  categorySetNumberPic = num + 1;
  // console.log(num)
}

function getCleanPictureSet(author) {
  // Set of pictures excluding all Pictures of this author
  let cleanPictureSet = [];
  cleanPictureSet = images.filter((item) => item.author !== author);
  return cleanPictureSet.map((item) => +item.imageNum);
}

const getAnswerSet_Pic = function () {
  dynamicPictureSet = [...getCleanPictureSet(getAuthorByNum(imageNum_Pic))]; // by the end on this function the Set would be cut, so should REcreate it before
  // console.log(dynamicPictureSet);
  answerSet_Pic = []; // clear Set
  answerSet_Pic.push(imageNum_Pic); // add the Number of Right answer picture first
  dynamicPictureSet.splice(dynamicPictureSet.indexOf(randomPicture), 1);
  // console.log(`${randomPicture} - ${getAuthorByNum(randomPicture)}`);
  for (let i = 0; i < 3; i++) {
    randomPicture = getRandom(dynamicPictureSet.length - 1);
    // console.log(`${randomPicture} - ${getAuthorByNum(dynamicPictureSet[randomPicture])}`)
    answerSet_Pic.push(dynamicPictureSet[randomPicture]);
    // console.log(answerSet_Pic)
    dynamicPictureSet.splice(
      dynamicPictureSet.indexOf(dynamicPictureSet[randomPicture]),
      1
    );
  }
  answerSet_Pic = answerSet_Pic.sort();
};

// getAnswerSet_Pic()

const timerProgressPic = document.getElementById('pic-timer-progress');
const timerBoxPic = document.getElementById('pic-timer');
let intervalId_Pic; // Timer setinterval variable to stop it
let pictureCardItem;

class PictureCard {
  constructor(author, name, year, num) {
    this.author = author;
    this.name = name;
    this.year = year;
    this.num = num;
  }
}

const picQuestion = document.querySelector('.pic-question'); // Question text
const picTimerVisibility = document.getElementById('pic-quiz-timer');

function drawPicCard(num) {
  pictureCardItem = new PictureCard(
    getAuthorByNum(num),
    getNameByNum(num),
    getYearByNum(num),
    num
  );
  picQuestion.innerHTML = `Какую картину написал ${pictureCardItem.author}?`; // insert Question text
  drawPicCardAnswers();
  if (localStorage.getItem('timeOn') === 'true') {
    updateProgressBarPic(+timeLimit.innerHTML);
    picTimerVisibility.style.visibility = 'visible';
  } else {
    picTimerVisibility.style.visibility = 'hidden';
  }
}
// drawPicCard(imageNum_Pic);

function drawPicCardAnswers() {
  getAnswerSet_Pic();
  for (let i = 0; i < pic_Answer.length; i++) {
    pic_Answer[
      i
    ].innerHTML = `<img src="src/assets/img/full/${answerSet_Pic[i]}full.webp" alt="${answerSet_Pic[i]}full.webp" value="${answerSet_Pic[i]}">`;
    pic_Answer[i].addEventListener('click', checkAnswer_Pic);
  }
}

const picResultCheck = document.querySelector('.pic-result-check');
const picResultSection = document.querySelector('.pic-card-result-section');
let pic_score = 0;
const picQuizScore = document.querySelector('.pic-quiz-score');

function checkAnswer_Pic(e) {
  picResultSection.style.left = 0;
  picResultSection.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  drawPicResult();
  if (+e.target.getAttribute('value') === pictureCardItem.num) {
    picResultCheck.innerHTML = `<img src="src/assets/img/svg/true.png" alt="true-false icon">`;
    playCorrect();
    pic_score++;
    // console.log('Bravo!');
  } else {
    picResultCheck.innerHTML = `<img src="src/assets/img/svg/false.png" alt="true-false icon">`;
    playFail();
    // console.log('Ups...')
  }

  clearInterval(intervalId_Pic);
}

function checkTimeOverAnswer_Pic() {
  picResultSection.style.left = 0;
  picResultSection.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  drawPicResult();
  playFail();
  picResultCheck.innerHTML = `<img src="src/assets/img/svg/false.png" alt="true-false icon">`;
  clearInterval(intervalId_Pic);
}

const picResultImageBox = document.querySelector('.pic-card-result-pic-box');
const picResultName = document.querySelector('.pic-result-name');
const picResultAuthorYear = document.querySelector('.pic-result-author-year');

function drawPicResult() {
  picResultImageBox.innerHTML = `<img class="pic-card-result-pic" src="src/assets/img/crop/${imageNum_Pic}.webp"" alt="result picture">`;
  picResultName.innerHTML = pictureCardItem.name;
  picResultAuthorYear.innerHTML = `${pictureCardItem.author}, ${pictureCardItem.year}`;
}

const nextPicCard = document.querySelector('.pic-result-next');
const backPicMenu = document.querySelector('.pic-quiz-back');
const congratPic = document.querySelector('.pic-quiz-result-section');
const picCongrats = document.querySelector('.pic-congrats');

nextPicCard.addEventListener('click', nextPic);
backPicMenu.addEventListener('click', endPicQuiz);

function nextPic() {
  picResultSection.style.left = '-100%';
  picResultSection.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  if (!(imageNum_Pic % 10)) {
    playQuizEnd();
    congratPic.style.left = 0;
    congratPic.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    picQuizScore.innerHTML = `${pic_score} / 10`;
    if (pic_score < 5) {
      picCongrats.innerHTML = 'Вы можете лучше!';
    } else if (pic_score < 8) {
      picCongrats.innerHTML = 'Вы разбираетесь в Живописи!';
    } else {
      picCongrats.innerHTML = 'Поздравляем!';
    }
    localStorage.setItem(`pic${categorySetNumberPic}`, pic_score); // save the score fot this category set
    console.log(localStorage.getItem(`pic${categorySetNumberPic}`));
  } else {
    imageNum_Pic++;
    drawPicCard(imageNum_Pic);
  }
}

function endPicQuiz() {
  congratPic.style.left = '-100%';
  congratPic.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  getContent('picture');
}

// Timer

function updateProgressBarPic(timer) {
  timerBoxPic.innerHTML = formatTime(timer);
  let timePosition = timer * 1000;
  timerProgressPic.max = timer * 1000;
  intervalId_Pic = setInterval(() => {
    if (timePosition === 0) {
      clearInterval(intervalId_Pic);
      checkTimeOverAnswer_Pic();
    } else {
      timerProgressPic.value = timePosition;
      timePosition -= 10;
      timerBoxPic.innerHTML = formatTime(timePosition / 1000);
    }
  }, 10);
}
