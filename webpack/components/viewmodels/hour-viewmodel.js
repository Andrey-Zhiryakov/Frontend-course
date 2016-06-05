var Note = require('./../models/note.js');

class HourModel {
  constructor(context = {}, hour) {
    this.hour = hour;
    if (context['hour' + hour]) {
      this.data = new Note(context['hour' + hour].caption, context['hour' + hour].text);
    } else {
      this.data = new Note();
    }
  }
}

module.exports = HourModel;
