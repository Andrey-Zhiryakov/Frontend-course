const log = require('../utils/log.js').info;
const express = require('express');
const router =  express.Router();

router.route('/random')
.get((req, res)=>{
  log(JSON.stringify(req.params));
  res.status(200).send({  // temproary plug
    name: "name",
    date: Date.now()
  });
});

router.route('/:startIndex/:count')
.get((req, res)=>{
res.send('ok');
});

router.route('/')
.post((req, res)=>{
res.send('ok');
});

router.route('/:id')
.get((req, res)=>{
res.send('ok');
})
.put((req, res)=>{
res.send('ok');
})
.delete((req, res)=>{
res.send('ok');
});













module.exports = router;
