var express=require("express");

var router=express.Router();
//函数 只要调用立即执行函数内代码段
//函数体 只是调用函数体，只会返回函数本身

var apiController = require("../controller/apiController");
var goodsApiController = require("../controller/goodsApiController");

//首页
router.get('/', apiController.index)
router.get('/list', apiController.list)
router.post("/getDataPost", apiController.getDataPost)


//商品功能
router.get('/goods', goodsApiController.index)
router.get('/goods/list', goodsApiController.list)


//将路由暴露出去
module.exports=router;