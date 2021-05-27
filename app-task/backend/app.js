const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://user_task_2:MXkmtOGBprMKiA8Y@cluster0.lir99.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => {
  console.log("Connected to DB Successfully!!");
})
.catch(() => {
  console.log("Apparently NOT!!");
});


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-Type,Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", '*');
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
