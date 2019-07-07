//配置
var Controller = require("./controller");
var fs=require("fs");
var uploads = require("../function/upload");

//调用处理方法
var Goods=require("../models/Goods");

class goodsController extends Controller {
    constructor() {
        super();
    }
    //首页
    index(req, res) {
        //分页
        Goods.getGoodsDataAndCount(5, req.query.page, function (result, num) {
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/goods", req.session);
        })
    }
    //添加页
    add(req, res) {

        res.render("admin/goodsAdd", req.session);
    }
   
    //添加数据
    addPost(req, res) {
        Goods.insertMany(req.body, (err, result) => {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/category", date: 3000 })
                return;//直接跳出
            }
            res.redirect("/admin/goods")
        })
    }
    //删除
    del(req, res) {
        Goods.FindAndDelete(req.query.id,function(){
            res.redirect("/admin/goods")
            return;
        })
    }
   //edit修改
    edit(req,res){
        var id=req.query.id;
        
        
        // console.log(id);
        Goods.find({"_id":id},(err,result)=>{
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/goods", date: 3000 })
            } else {
                req.session.edit =result;
                // console.log(req.session)
                res.render('admin/goodsEdit', req.session);
            }
        })
    }
//提交修改
    editPost(req,res){
        // console.log(req.query.id)
        console.log(req.body)

        Goods.updateOne({"_id":req.body.id},req.body, function (err, result) {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/goods", date: 3000 })
            } else {
                res.redirect('/admin/goods');
            }
        })
    }

    //图片提交
    upload(req,res){
       //上传图片功能
       uploads.init(req,function(data){
           if(data.err==200){
               res.json(data);//传递数据回去网页
           }else{
               res.render("admin/error",{err:data.err,url:"/admin/goods/add",date:3000});
           }
       })
    }
    // 删除图片
    deleteImg(req, res) {
        fs.unlink("./" + req.body.url, function (err) {
            res.send("1")
            return;
        })
    }
}
//暴露方法
module.exports = new goodsController;