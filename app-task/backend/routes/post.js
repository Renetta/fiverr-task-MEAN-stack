const express = require('express');
const router = express.Router();
const Post = require('../model/post');
const checkAuth = require('../middleware/check-auth');

router.get('', (req, res, next) => {
  Post.find().then((documents) => {
    res.json({
      message: "Posts retrieved from Succcessfully!!",
      posts: documents
    });
  });
});

router.post('', checkAuth, (req, res, next) => {
  const posts = new Post({
    title: req.body.title,
    content: req.body.content
  });

  posts.save();
  console.log('posts----', posts);

  res.status(201).json({
    message:" Posts created successfully",
  })
});

router.post('/delete', checkAuth, (req, res, next) => {
  console.log('iddd', req.body.id);
  Post.findOneAndDelete({_id: req.body.id})
	.then(() =>{
		res.status(201).json({
			message: "The Post deleted Successfully",
		})
	})
	.catch(error =>{
		res.status(300).json({
			message: "An error occurred"
		})
	})
})

module.exports = router;
