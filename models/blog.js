const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// new Schema를 함으로써 모델을 컴파일.
const blogSchema = new Schema({
  // document의 구조가 어떤지 알려준다.
  url: String,
  tags: Array
});

module.exports = mongoose.model("blog", blogSchema, "blog");
// 데이터베이스에서 CRUD하는 인터페이스를 정의한다.
// 첫번째로 들어간 인자
