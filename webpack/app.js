require('./components/styles/app.scss');
var {week, weekModel} = require('./components/');

window.addEventListener('load', ()=>{
 document.body.appendChild(week(new weekModel(1)));
});
