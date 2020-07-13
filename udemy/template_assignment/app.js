const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const users = [];

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.render("main", { pageTitle: "add user" });
});
app.get("/user", (req, res, next) => {
  res.render("user", { pageTitle: "User", users: users });
  //   user.ejs에서 값을 가져오는 형태임
});

app.post("/add-user", (req, res, next) => {
  users.push({ name: req.body.username });
  res.redirect("/user");
});

app.listen(3000);
