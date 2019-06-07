const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/", (req, res) => {
  Blog.find({}, function(err, result) {
    if (err) return handleeError(error);
    res.header("Access-Control-Allow-Origin", "*");
    console.log("here", result);
    res.json(result);
  });
});

module.exports = router;
