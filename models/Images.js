var mongoose = require("mongoose");


// 数据库骨架
var ImagesSchema = mongoose.Schema({
    "alt": String,//图片名
    "url": String,//链接
})


module.exports = mongoose.model("image1", ImagesSchema);