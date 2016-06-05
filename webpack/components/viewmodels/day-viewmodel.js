var Hour = require('./hour-viewmodel');
var notesList = require('./../data/notesList');
var Note = require('./../models/note');

class DayModel {

  constructor(weekNumber = 1, dayNumber = 1){
    this.hours = [];
    let notesByHour = {};

    if (notesList['week' + weekNumber]) {
      if (notesList['week' + weekNumber]['day' + dayNumber]) {
        notesList['week' + weekNumber]['day' + dayNumber].notes.forEach(note => {
          notesByHour['hour' + note.hour] = new Note(note.caption, note.text);
        });
      }
    }

    for (let i = 1; i <= 24; i++) {
      this.hours.push(new Hour(notesByHour, i));
    }
  }
}

module.exports = DayModel;
