const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/", (req, res) => {
  Blog.find({}, function(err, result) {
    if (err) return handleeError(error);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(result);
  });
});

router.get("/detail", (req, res) => {
  console.log("req.query", req.query);
  const _id = req.query._id;
  Blog.find({ _id: _id }, function(err, result) {
    if (err) return handleeError(error);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(result);
  });
});

module.exports = router;
