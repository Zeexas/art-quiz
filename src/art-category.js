import { startArtQuiz } from './art-cards';

export const artToStart = document.getElementById('art-to-start');

export function drawArtItem() {
  const artCategory = document.querySelector('.artist-category');
  artCategory.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const artItem = `<div class="category-item category-item-artists">
    <div class="category-item-title">Художники - ${i + 1}</div>
    <img class="category-item-icon art${
      localStorage.getItem('art' + (i + 1)) ? i + 1 : 'New'
    }" src="src/assets/img/crop/${i * 10 + 3}.webp" alt="image ${
      i * 10 + 3
    }.webp"></img>
    <div class="category-item-result-history" style="display: ${
      localStorage.getItem('art' + (i + 1)) ? 'flex' : 'none'
    }">${localStorage.getItem('art' + (i + 1))}</div>
    </div>`;
    setTimeout(() => {
      artCategory.insertAdjacentHTML('beforeend', artItem);
    }, 300);
  }

  setTimeout(() => {
    const artItemsPull = document.querySelectorAll('.category-item-artists');
    for (let i = 0; i < 12; i++) {
      artItemsPull[i].addEventListener('click', () => {
        startArtQuiz(i);
      });
    }
  }, 300);
}
