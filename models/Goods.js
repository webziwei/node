var mongoose = require("mongoose");
var fs=require("fs");

var GoodsSchema = mongoose.Schema({
    // 分类id
    category: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: "Category"
    },
    // 标题
    title: {
        type: String,
        default: ""
    },
    // 地址
    address: {
        type: String,
        default: ""
    },
    // 价格
    price: {
        type: String,
        default: ""
    },
    // 旧价格
    oldPrice: {
        type: String,
        default: ""
    },
    // 收藏
    iscollect: {
        type: Boolean,
        default: false
    },
    // 简介
    description: {
        type: String,
        default: ""
    },
    // 内容
    content: {
        type: String,
        default: ""
    },
    // 缩略图
    thumbnail: {
        type: String,
        default: ""
    },
    // 多图
    imgs: {
        type: Array
    },
    // 添加数据时间
    addTime: {
        type: Date,
        default: new Date()
    }
})
//分页功能
GoodsSchema.statics.getGoodsDataAndCount = function (limit, pageData, callback) {
    var page = 0;//定义初始页
    if (pageData != undefined) {
        page = pageData;
    }
    var _this = this;//记录this值  limit显示条数 skip 从哪开始
    _this.find({}).limit(limit).skip(page * limit).sort({ _id: -1 }).then(function (result) {
        _this.find().countDocuments().then(function (num) {//num总数据数
            callback(result, Math.ceil(num / limit));
        })
    })
}
//删除数据与片图 
GoodsSchema.statics.FindAndDelete=function(id,callback){
//1.查找数据
//2.删除数据
//3.缩略图 多图删除

//记录this
var _this=this;

_this.findOne({_id:id},function(err,result){
    //将缩略图添加进多图数组
    result.imgs.push(result.thumbnail);

    _this.deleteOne({"_id":id},function(err){
        //判断有没有图片
        if(result.imgs.length!=0){
            (function add(i){
                if(i==result.imgs.length){
                    callback();
                }
                fs.unlink("./"+result.imgs[i],function(err){
                    add(i+1);
                })
            }(0))
        }else{
            callback();
        }

    })

})
}


module.exports = mongoose.model("Goods", GoodsSchema);