var mongoose = require("mongoose");


// 数据库骨架
var MusicsSchema = mongoose.Schema({
    "song_id": String,//歌曲id
    "author": String,//歌手名
    "pic_small": String,//缩略图
    "title": String,//歌名
    "pic_big": String//大图
})
MusicsSchema.statics.getGoodsDataAndCount = function (limit, pageData, callback) {
    var page = 0;//定义初始页
    if (pageData != undefined) {
        page = pageData;
    }
    var _this = this;//记录this值  limit显示条数 skip 从哪开始 sort -1倒序
    _this.find({}).limit(limit).skip(page * limit).sort({ _id: -1 }).then(function (result) {
        _this.find().countDocuments().then(function (num) {//num总数据数
            callback(result, Math.ceil(num / limit));
        })
    })
}


module.exports = mongoose.model("music", MusicsSchema);