const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser"); // client의 post 요청에서 body의 parameter를 쉽게 추출함.

router.use(bodyParser.urlencoded({ extended: true }));
router.use("/blog", require("./blog"));
router.use("/til", require("./til"));

module.exports = router;
