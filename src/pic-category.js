import { startPictureQuiz } from './pic-cards';

export const picToStart = document.getElementById('pic-to-start');

export function drawPicItem() {
  const picCategory = document.querySelector('.picture-category');
  picCategory.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const picItem = `<div class="category-item category-item-picture">
    <div class="category-item-title">Картины - ${i + 1}</div>
    <img class="category-item-icon pic${
      localStorage.getItem('pic' + (i + 1)) ? i + 1 : 'New'
    }" src="src/assets/img/crop/${i * 10 + 7}.webp"></img>
    <div class="category-item-result-history" style="display: ${
      localStorage.getItem('pic' + (i + 1)) ? 'flex' : 'none'
    }">${localStorage.getItem('pic' + (i + 1))}</div>
    </div>`;
    setTimeout(() => {
      picCategory.insertAdjacentHTML('beforeend', picItem);
    }, 300);
  }
  setTimeout(() => {
    const picItemsPull = document.querySelectorAll('.category-item-picture');
    for (let i = 0; i < 12; i++) {
      picItemsPull[i].addEventListener('click', () => {
        startPictureQuiz(i);
      });
    }
  }, 300);
}
