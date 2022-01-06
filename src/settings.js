const settingsMarkup = `<div class="settings-content">
<div class="settings-header">
  <div>
    <span class="back"></span>
    <span>Настройки</span>
  </div>
  <div id="cross" class="cross"></div>
</div>
<div class="settings-body">
  <div class="volume">
    <div class="set-titles">Звук</div>
    <input type="range" id="volume-bar" class="volume-bar" min="0" max="100" value="30">
  </div>
  <div class="time-on">
    <div class="time-on-title set-titles">Игра на время</div>
    <div class="time-on-item">
      <div class="time-on-text">Выкл / вкл</div>
      <label class="toggle">
        <input class="timeOn" type="checkbox" checked>
        <div class="switch"></div>
      </label>
    </div>
  </div>
  <div class="time-set">
    <div class="set-titles">Время на размышление</div>
    <div class="time-setter">
      <div id="minus" class="minus"></div>
      <div class="time-limit">20</div>
      <div id="plus" class="plus"></div>
    </div>
  </div>
</div>
</div>`;

// const minus = document.querySelector('.minus');
// const plus = document.querySelector('.plus');
export let volumeBar = document.querySelector('.volume-bar');
export let volumeLevel = volumeBar.value;
export let timeLimit = document.querySelector('.time-limit');
let timeOnToggle = document.querySelector('.timeOn');

app.addEventListener('click', (e) => {
  let timer = +timeLimit.innerHTML;
  if (e.target.id === 'minus') {
    if (timer > 5) {
      timer -= 5;
    }
    timeLimit.innerHTML = timer;
    localStorage.setItem('timer', timer);
  }
  if (e.target.id === 'plus') {
    if (timer < 30) {
      timer += 5;
    }
    timeLimit.innerHTML = timer;
    localStorage.setItem('timer', timer);
  }
});

timeOnToggle.addEventListener('input', () => {
  localStorage.setItem('timeOn', timeOnToggle.checked);
  console.log(timeOnToggle.checked);
});
