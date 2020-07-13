const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/user", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "user.html"));
});

module.exports = router;
