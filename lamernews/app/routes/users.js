const log = require('../utils/log').info;
const express = require('express');
const router = express.Router();
const user = require('../models/User');

router.route('/:username')
.get((req, res)=>{

})
.put((req, res)=>{

})
.delete((req, res)=>{

});

router.post('/', (req, res)=>{
  console.log(req.body);
  user.addUser(req.body, req.handler /*callback*/);
});















module.exports = router;
