const mongoose=require("mongoose");


var userSchema=mongoose.Schema({
    username:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false//默认不是管理员，true才是管理员
    }
})
userSchema.statics.isUsernameAndPassword=function(fields,callback){//fields形参外面调用者传进来的
    this.findOne({'username':fields.username},(err,result)=>{
        //判断密码
        if(result!=null&&fields.password==result.password&&result.isAdmin==true){
            callback(true);//调用回调函数 实参值为true
        }else{
            callback(false);//调用回调函数 实参值为false
        }
    })
}

module.exports = mongoose.model("User",userSchema);