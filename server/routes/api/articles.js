const mongoose = require('mongoose');
const router = require('express').Router();
const Articles = mongoose.model('Articles');


/*POST localhost:8000/api/articles/ which expects a body(see below) to create an article
{
	"title": "Title here",
	"author": "Author name here",
	"body": "Description here",
}
*/
router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body.author) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if(!body.body) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }

  const finalArticle = new Articles(body);
  return finalArticle.save()
    .then(() => res.json({ article: finalArticle.toJSON() }))
    .catch(next);
});


//GET localhost:8000/api/articles  returns a list of all articles.
router.get('/', (req, res, next) => {
  return Articles.find()
    .sort({ createdAt: 'descending' })
    .then((articles) => res.json({ articles: articles.map(article => article.toJSON()) }))
    .catch(next);
});


// GET localhost:8000/api/articles?id=id_here -- gets article by id paremet in url
router.param('id', (req, res, next, id) => {

  return Articles.findById(id, (err, article) => {
    if(err) {
      return res.sendStatus(404);
    } else if(article) {
      req.article = article;
      return next();
    }
  }).catch(next);
});


//GET localhost:8000/api/articles/:id = returns a specific article by id.
router.get('/:id', (req, res, next) => {
  return res.json({
    article: req.article.toJSON(),
  });
});


/*PATCH localhost:8000/api/articles/:id -- updates an article by id
{
	"title": "Title here",
	"author": "Author name here",
	"body": "Description here",
}*/
router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body.title !== 'undefined') {
    req.article.title = body.title;
  }

  if(typeof body.author !== 'undefined') {
    req.article.author = body.author;
  }

  if(typeof body.body !== 'undefined') {
    req.article.body = body.body;
  }

  return req.article.save()
    .then(() => res.json({ article: req.article.toJSON() }))
    .catch(next);
});


// DELETE localhost:8000/api/articles/:id deletes an article by id
router.delete('/:id', (req, res, next) => {
  return Articles.findByIdAndRemove(req.article._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;