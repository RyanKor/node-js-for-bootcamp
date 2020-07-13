const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "main.html"));
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
