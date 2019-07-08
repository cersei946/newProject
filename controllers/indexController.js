var express = require('express');
var router = express.Router();
var async = require('async');
var indexModel = require('../models/index/indexModel');
// var logined = require('../util/logined');

router
  .get('/', function (req, res, next) {
    
      res.render('index', {
        title: '标题', 
    
    });
  });

module.exports = router;
