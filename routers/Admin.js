var express=require("express");
var router=express.Router();
//函数 只要调用立即执行函数内代码段
//函数体 只是调用函数体，只会返回函数本身

var adminController=require("../controller/adminController");
var categoryController=require("../controller/categoryController");
var goodsController = require("../controller/goodsController");
var musicsController = require("../controller/musicsController");
var moviesController = require("../controller/moviesController");
var imagesController = require("../controller/imagesController");



//调用后台各页面
router.get('/login',adminController.login)
router.post('/login',adminController.loginPost)
router.use(adminController.validate);
router.get('/',adminController.index)
router.get('/index',adminController.index)
router.get('/out',adminController.out)

//调用后台分类功能
// router.get('/category/index',adminController.index);
router.get('/category',categoryController.index);
router.get('/category/add',categoryController.add);
router.post('/category/add',categoryController.addPost);

router.get('/category/del',categoryController.del);
router.get('/category/edit',categoryController.edit);
router.get('/category/find',categoryController.find);

//商品功能
router.get("/goods", goodsController.index)
router.get("/goods/add", goodsController.add)
router.get("/goods/del", goodsController.del)
router.get("/goods/edit", goodsController.edit)
router.post("/goods/edit", goodsController.editPost)



//修改提交
router.post("/goods/add", goodsController.addPost)
//提交图片
router.post("/goods/upload", goodsController.upload)
router.post("/goods/deleteImg", goodsController.deleteImg)


//music
router.get("/musics", musicsController.index)
router.get("/musics/del", musicsController.del)

//movie
router.get("/movies", moviesController.index)
router.post("/movies/info", moviesController.info)

//images
router.get("/images", imagesController.index)








//将路由暴露出去
module.exports=router;