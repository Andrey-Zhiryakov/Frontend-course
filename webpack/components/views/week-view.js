require('./../styles/weekstyle.scss');
var Day = require('./day-view');

function Week(content) {
  let container = document.createElement('div');

  container.innerHTML = `
<div class="calendar-week">
  <div class="head">
    <div class="header"><span>Hour</span></div>
    <div class="header"><span>Monday</span></div>
    <div class="header"><span>Tuesday</span></div>
    <div class="header"><span>Wednesday</span></div>
    <div class="header"><span>Thursday</span></div>
    <div class="header"><span>Friday</span></div>
    <div class="header"><span>Saturday</span></div>
    <div class="header"><span>Sunday</span></div>
  </div>
  <div class="body">
  </div>
</div>
`;
  let body = container.querySelector('.body');
  let hoursList = document.createElement('ul');

  for (let i = 1; i <= 24; i ++) {
    hoursList.innerHTML += `
    <li class="hour hour-number">${i}</li>
    `;
  }
  let hours = document.createElement('div');
  hours.classList.add('day-wrapper');
  hours.appendChild(hoursList);
  body.appendChild(hours);

  for (let i = 0; i < 7; i++) {
    container.querySelector('.body').appendChild(new Day(content.days[i]));
  }

  return container;
}

module.exports = Week;
