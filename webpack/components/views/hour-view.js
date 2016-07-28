require('./../styles/hourstyle.scss');

function HourView(context) {
  var container = document.createElement('li');
  var caption = document.createElement('h6');
  var text = document.createElement('p');

  container.classList.add('hour');
  caption.classList.add('caption');
  text.classList.add('text');

  if (context.data.caption) {
    container.classList.add('has-note');
  }

  caption.innerText = context.data.caption;
  text.innerText = context.data.text;

  container.appendChild(caption);
  container.appendChild(text);

  return container;
}

module.exports = HourView;
