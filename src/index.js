// import { start_page } from './start.js';
// import { cropImageSet, fullImageSet, svgImageSet } from './image-set';
require('./assets/img/crop/203.webp');
import './style.css';
import './adaptive.css';
import { volumeBar } from './settings';
import { drawArtItem, artToStart } from './art-category';
import { drawPicItem, picToStart } from './pic-category';
import { artQuizCard } from './art-cards';
import { picQuizCard } from './pic-cards';

// Pages variables
const app = document.getElementById('app');
const startPage = document.getElementById('start-page');
const settingsPage = document.getElementById('settings-page');
export const artistsPage = document.getElementById('artists-page');
export const picturePage = document.getElementById('picture-page');

//  Links variables
const artistsQuiz = document.getElementById('artists-quiz');
const pictureQuiz = document.getElementById('picture-quiz');
const artSettings = document.getElementById('art-settings');
const picSettings = document.getElementById('pic-settings');

function setLocalStorage() {
  if (!localStorage.getItem('pageCurrent')) {
    localStorage.setItem('pageCurrent', 'start');
  }
  localStorage.setItem('timeOn', document.querySelector('.timeOn').checked);
  localStorage.setItem('volume', volumeBar.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (!localStorage.getItem('previousCurrent')) {
    getContent(localStorage.getItem('pageCurrent'));
  }
  if (localStorage.getItem('timer')) {
    document.querySelector('.time-limit').innerHTML =
      localStorage.getItem('timer');
  }
  if (localStorage.getItem('timeOn')) {
    document.querySelector('.timeOn').checked = JSON.parse(
      localStorage.getItem('timeOn')
    );
  }
  if (localStorage.getItem('volume')) {
    volumeBar.value = localStorage.getItem('volume');
  }
}
window.addEventListener('load', getLocalStorage);

export function getContent(current) {
  switch (current) {
    case 'start':
      startPage.classList.remove('hide');
      settingsPage.classList.add('hide');
      artistsPage.classList.add('hide');
      picturePage.classList.add('hide');
      // if (previous) { previous.classList.add('hide') };
      break;
    case 'settings':
      settingsPage.classList.remove('hide');
      startPage.classList.add('hide');
      artistsPage.classList.add('hide');
      picturePage.classList.add('hide');
      break;
    case 'artists':
      artistsPage.classList.remove('hide');
      startPage.classList.add('hide');
      settingsPage.classList.add('hide');
      artQuizCard.classList.add('hide');
      drawArtItem();
      break;
    case 'picture':
      picturePage.classList.remove('hide');
      startPage.classList.add('hide');
      settingsPage.classList.add('hide');
      picQuizCard.classList.add('hide');
      drawPicItem();
      break;
  }
  // app.innerHTML = contentActive;
}
// getContent(localStorage.getItem('content'));

artistsQuiz.addEventListener('click', () => {
  //  move to Artists page
  getContent('artists', startPage);
  localStorage.setItem('pageCurrent', 'artists');
  // localStorage.setItem('pagePrevious', 'start')
});

pictureQuiz.addEventListener('click', () => {
  //  move to Picture page
  getContent('picture', startPage);
  localStorage.setItem('pageCurrent', 'picture');
  // localStorage.setItem('pagePrevious', 'start')
});

artToStart.addEventListener('click', () => {
  //  move to Start page
  getContent('start', artistsPage);
  localStorage.setItem('pageCurrent', 'start');
  // localStorage.setItem('pagePrevious', 'artists');
});

picToStart.addEventListener('click', () => {
  //  move to Start page
  getContent('start', picturePage);
  localStorage.setItem('pageCurrent', 'start');
  // localStorage.setItem('pagePrevious', 'picture');
});

artSettings.addEventListener('click', () => {
  //  move to Settings from Artists section
  getContent('settings', artistsPage);
  localStorage.setItem('pageCurrent', 'settings');
  localStorage.setItem('pagePrevious', 'artists');
});

picSettings.addEventListener('click', () => {
  //  move to Settings from Picture section
  getContent('settings', picturePage);
  localStorage.setItem('pageCurrent', 'settings');
  localStorage.setItem('pagePrevious', 'picture');
});

app.addEventListener('click', (e) => {
  if (e.target.id === 'settings') {
    getContent('settings');
    localStorage.setItem('pageCurrent', 'settings');
    localStorage.setItem('pagePrevious', 'start');
  }
  if (e.target.id === 'cross') {
    if (localStorage.getItem('pagePrevious') === 'start') {
      getContent('start');
      localStorage.setItem('pageCurrent', 'start');
    } else if (localStorage.getItem('pagePrevious') === 'artists') {
      getContent('artists');
      localStorage.setItem('pageCurrent', 'artists');
    } else if (localStorage.getItem('pagePrevious') === 'picture') {
      getContent('picture');
      localStorage.setItem('pageCurrent', 'picture');
    }
  }
});

console.log('Предварительная оценка - 147');
console.log('1. Стартовая страница и навигация - 20');
console.log('2. Настройки - 40');
console.log('3. Страница категорий - 30 ');
console.log('4. Страница с вопросами - 50');
console.log(
  '5. Реализована анимация отдельных деталей - 5 (вывод результатов раунда)'
);
console.log(
  '6. Дополнительный функционал: разные уведомления по окончанию раунда в зависимости от результата +2'
);
