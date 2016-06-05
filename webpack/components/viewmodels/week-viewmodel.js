var Day = require('./day-viewmodel');

class WeekModel {
  constructor(weekNumber = 1){
    this.weekNumber = weekNumber;
    this.days = [];
    for (let i = 0; i < 7; i++) {
      this.days.push(new Day(weekNumber, i+1));
    }
  }
}

module.exports = WeekModel;
