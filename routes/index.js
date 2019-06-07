var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser"); // client의 post 요청에서 body의 parameter를 쉽게 추출함.
router.use(bodyParser.urlencoded({ extended: true }));
const Til = require("../models/til");
const Blog = require("../models/blog");

var showdown = require("showdown");
var converter = new showdown.Converter();

router.post("/api/addtils", (req, res) => {
  console.log("req.bodyyyyy", req.body, JSON.stringify(req.body));

  res.header("Access-Control-Allow-Origin", "*");

  const til = new Til();
  til.week = 1;
  til.startDate = "190101";
  til.endDate = "190105";
  til.content = JSON.stringify(req.body);
  console.log("til", til);

  til.save(error => {
    if (error) {
      console.log(error);
      res.json({ result: 0 });
      return;
    }

    res.json({ result: 1 });
  });

  // Til.create(
  //   {
  //     week: "11",
  //     startDate: "190101",
  //     endDate: "190101",
  //     content: req.body
  //   },
  //   function(err, results) {
  //     if (err) console.log(err);

  //     res.json(results);
  //     // saved!
  //   }
  // );
});

// router.get("/api/blog/search")

router.get("/api/til", (req, res) => {
  Til.find({}, function(err, result) {
    if (err) return handleError(error);
    res.header("Access-Control-Allow-Origin", "*");

    const formattedResult = [];

    const formatDate = date => {
      const yy = date
        .getFullYear()
        .toString()
        .slice(2);
      const mm = date.getMonth() + 1;
      const dd = date.getDate();

      return [yy, (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("");
    };

    for (let i = 0; i < result.length; i++) {
      const formatted = {};
      formatted.week = result[i].week;
      formatted.date =
        formatDate(result[i].startDate) + "-" + formatDate(result[i].endDate);
      formatted.content = converter.makeHtml(result[i].content);
      formattedResult.unshift(formatted);
    }

    res.json(formattedResult);
  });
});

router.get("/api/til/search", (req, res) => {
  const keyword = req.query[0];
  console.log("keyword", keyword);
  const newEx = new RegExp(keyword, "i");

  Til.find({ content: newEx }, function(err, result) {
    if (err) return handleError(error);
    res.header("Access-Control-Allow-Origin", "*");

    const formattedResult = [];

    const formatDate = date => {
      const yy = date
        .getFullYear()
        .toString()
        .slice(2);
      const mm = date.getMonth() + 1;
      const dd = date.getDate();

      return [yy, (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("");
    };

    for (let i = 0; i < result.length; i++) {
      const formatted = {};
      formatted.week = result[i].week;
      formatted.date =
        formatDate(result[i].startDate) + "-" + formatDate(result[i].endDate);
      formatted.content = converter.makeHtml(result[i].content);
      formattedResult.unshift(formatted);
    }
    console.log("search result------>", formattedResult);
    res.json(formattedResult);
  });
});

module.exports = router;
