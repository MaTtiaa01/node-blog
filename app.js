const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const morgan = require("morgan");
require("dotenv").config();
// const path = require('path')
// const _ = require('lodash')

const app = express();

// //import bootstrap
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

//connect to db
const mongoose = require("mongoose");
const key = process.env.MONGO_DB;

mongoose
  .connect(
    "mongodb+srv://mattia2001:" +
      key +
      "@cluster0.gumz4jb.mongodb.net/node-blogs"
  )
  .then((results) => {
    app.listen("4000");
    console.log("app connected");
  })
  .catch((err) => {
    console.log(err);
  });

//set view engine
app.set("view engine", "ejs");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//to go on
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.use("/blogs", blogRoutes);

app.get("/about", (req, res) => {
  res.render("about");
});

//404 page not found
app.use((req, res) => {
  res.status(404).render("404");
});
