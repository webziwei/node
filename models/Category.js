//创建骨架模板
var mongoose=require("mongoose");

var CategorySchema=mongoose.Schema({
    name:String
})

// CategorySchema.method // 动态方法  把定义方法直接加入骨架Schema
// CategorySchema.statics  //静态方法   在骨架外定义方法，不属于骨架全局方法

CategorySchema.statics.getCategoryDataAndCount=function(limit,pageData,callback){
    var page=0;//给初始值页数不然为undefined
    if(pageData!=undefined){
        page=pageData;//赋值
    }
    var _this=this;//记录this
    _this.find({}).limit(limit).skip(page*limit).sort({_id: -1}).then(function(result){//limit(查询条数).skip(从哪条开始)
        _this.find().countDocuments().then(function(num){//count()查询数据库总条数 num(查询到的条数)
            callback(result,Math.ceil(num/limit));
        })
    })

}


module.exports=new mongoose.model("Category",CategorySchema);