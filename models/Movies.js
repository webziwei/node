var mongoose = require("mongoose");


// 数据库骨架
var MoviesSchema = mongoose.Schema({
    "title": String,//电影名
    "release": String,//上映时间
    "rate": String,//豆瓣评分
    "duration": String,//电影时长
    "actors": String,//演员名
    "region": String,//发行地
    "trailer": String,//预告片链接
    "director": String,//导演
    "img": String//图片链接
})
MoviesSchema.statics.getGoodsDataAndCount = function (limit, pageData, callback) {
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


module.exports = mongoose.model("movie", MoviesSchema);