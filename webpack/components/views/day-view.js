require('./../styles/daystyle.scss');
var Hour = require('./hour-view');

function DayView(context) {
  var container = document.createElement('div');
  hoursList = document.createElement('ul');

  for (let i = 1; i <=24; i++) {
    hoursList.appendChild(new Hour(context.hours[i-1]));
  }

  container.appendChild(hoursList);
  container.classList.add('day-wrapper');
  return container;
}

module.exports = DayView;
