var Hour = require('./hour-viewmodel');


class DayModel {

  constructor(weekNumber = 1, dayNumber = 1){

    //here this must read notesList form another file/location and cache it
    var notesList = {
      week1 : {
        day1 : {
          notes : [
            {
              hour : 7,
              caption : 'note 1',
              text : "Create task"
            }
          ]
        },
        day3 : {
          notes : [
            {
              hour : 15,
              caption : 'note 1',
              text : "Complete task"
            }
          ]
        },
        day5 : {
          notes : [
            {
              hour : 19,
              caption : 'note 1',
              text : "Send work"
            }
          ]
        },
      }
    };

    if (notesList['week' + weekNumber]
      && notesList['week' + weekNumber]['day' + dayNumber]
      && notesList['week' + weekNumber]['day' + dayNumber].notes)
    {
      var notesByhours = {};

      notesList['week' + weekNumber]['day' + dayNumber].notes.forEach(note => {
        notesByhours['hour' + note.hour] = {caption : note.caption, text: note.text};
      });

      this.hours = [];
    }

  }
}

module.exports = DayModel;
