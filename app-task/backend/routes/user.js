const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ExpressBrute = require('express-brute')
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      firstname: req.body.firstname,
      secondname:req.body.secondname,
      username:req.body.username,
      email: req.body.email,
      password: hash
    });

    user.save()
    .then(result => {
      res.status(201).json({
        message: "User Created Successfully!!",
        result: result
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
  });
});

router.post('/login',
bruteforce.prevent, (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
  .then(user => {
    if(!user) {
      return res.status(401).json({
        message: "Invalid Email or Password"
      });
    }

    fetchedUser = user;

    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    console.log("2 time checking", result);
    if(!result)
    {
      return res.status(401).json({
        message: "Authentication Failure "
      });
    }

    const token = jwt.sign({
      email: fetchedUser.email,
      id: fetchedUser._id
    }, "secret_this_should_be_longer_time", {
      expiresIn: '1h'
    });

    res.status(200).json({
      token:token,
      currentUser: fetchedUser
    });
  })
  .catch(error => {
    res.status(401).json({
      message: "Authentication Failure"
    });
  })
})

module.exports = router;
