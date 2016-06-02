var {week, weekModel} = require('/components/');

document.addEventListener('load', ()=>{
  document.body.appendChild(week(new weekModel()));
});
