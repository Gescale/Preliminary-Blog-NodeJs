//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let postsArray = [];

app.get("/", function(req, res) {
  res.render("home", {
    heading1: "Home",
    content: homeStartingContent,
    posts: postsArray
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    heading1: "About",
    content: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    heading1: "Contact",
    content: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose", {
    heading1: "Compose"
  });
});

app.post("/compose", function(req, res) {
  post = {
    title: req.body.composeTitle,
    body: req.body.composeBody
  };
  postsArray.push(post);
  res.redirect("/");
});


app.get("/posts/:postName", function(req, res) {
  let param = _.lowerCase(req.params.postName);
  let counter = 0;
  let postings;
  for (let i = 0; i < postsArray.length; i++) {
    if (param === (_.lowerCase(postsArray[i].title))) {
      postings = postsArray[i];
    counter++;
  }
}
if (counter > 0) {
  res.render("post", {
    heading1: postings.title,
    content: postings.body
  });
} else if (counter === 0) {
  console.log("Not Found!");
}
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
