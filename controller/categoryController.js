//继承
const Controller=require("./controller");

const Category = require("../models/Category");

//后台分类功能
class categoryController extends Controller{
    constructor(){
        super();//必须初始化父类参数
    }
    //分类首页
    index(req,res){
        //分页功能
        // console.log(req.query.page);

        Category.getCategoryDataAndCount(5, req.query.page,function(result,num){
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/category", req.session);
        })
       
    }
    //添加
    add(req,res){
        res.render("admin/categoryAdd",req.session)
    }
    //添加数据
    addPost(req,res){
        Category.insertMany(req.body,(err,result)=>{
            if(err){
                res.render("admin/error", { err: "数据操作失败", url: "/admin/category", date: 3000 })
                return;//直接跳出
            }
            res.redirect("/admin/category")
        })
    }
    //修改
    edit(req,res){
        res.send("欢迎来到后台分类功能修改页")
    }
    //删除
    del(req,res){
        var id=req.query.id;
        Category.deleteOne({"_id":id},(err)=>{
            if(err){
                res.render("admin/error", { err: "数据操作失败", url: "/admin/category", date: 3000 })
            }else{
                res.redirect('/admin/category');
            }
        })
    }
    //查找
    find(req,res){
        res.send("欢迎来到后台分类功能查找页")
    }
}


module.exports=new categoryController;