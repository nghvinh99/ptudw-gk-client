var express = require('express');
var router = express.Router();
var pool = require('../config/database');

router.get('/', function(req, res, next) {
  pool.query('SELECT * FROM BLOG ORDER BY id ASC', function (err, result){
    if (err) {
      res.end();
      return console.log('error running query');
    } else {
      res.render('pages/blogs/blogs', 
      { title: 'Bài viết' , 
      breadcrumb: 'Trang chủ / Bài viết',
      blogs: result});
    }
  })
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  pool.query("SELECT * FROM BLOG WHERE id = '"+id+"'", function (err, result){
    if (err) {
      res.end();
      return console.log("Error running querry");
    } else {
      res.render('pages/blogs/single-blog', 
      { title: 'Bài viết' , 
      breadcrumb: 'Trang chủ / Bài viết / '+result.rows[0].name,
      blog: result.rows[0]});
    }
  })
});

module.exports = router;
