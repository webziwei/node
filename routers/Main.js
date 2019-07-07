var express=require("express");

var router=express.Router();

router.get('/',(req,res)=>{
    res.send("欢迎来到前台首页")

})
router.get('/list',(req,res)=>{
    res.send("欢迎来到前台列表页")

})
router.get('/xq',(req,res)=>{
    res.send("欢迎来到前台详情页")

})

//将路由暴露出去
module.exports=router;