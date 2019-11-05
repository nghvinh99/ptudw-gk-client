var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/blogs/blogs', { title: 'Bài viết' , breadcrumb: 'Trang chủ / Bài viết'});
});

router.get('/1', function(req, res, next) {
  res.render('pages/blogs/single-blog', { title: 'Bài viết' , breadcrumb: 'Trang chủ / Bài viết / 1'});
});

module.exports = router;
