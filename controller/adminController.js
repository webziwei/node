//继承
const Controller=require("./controller");
const md5=require("../function/md5");
const User=require("../models/User");

class AdminController extends Controller{
    constructor(){
        super();//必须初始化父类参数
        //this对象指向问题 修改this指向类原本指向路由
        // this.index=this.index.bind(this);
    }
  

    index(req,res){
        res.render("admin/index",req.session);//获取缓存值
    }
    login(req,res){
        res.render("admin/login");
    }
      //验证是否登录，过滤后台链接
      validate(req,res,next){
        // console.log(req.session)
        if(req.session.login=="1"){
            next()//登录成功调到下一路由
        }else{
                // res.render("admin/login");//登陆不成功只能指向登陆页
                res.redirect("login");

        }
    }
    //退出登录
    out(req,res){
        req.session.login=0;
        req.session.username=null;
        res.redirect("login");
    }
    //登陆验证
    loginPost(req,res){
        // console.log(req.body);
        //登录数据验证
        var fields=md5(req.body);//1失败(获取不到数据) false 2.成功(获取到数据) obj  获取到加密数据obj
        // console.log(fields);
        if(!fields){//如果没数据走这里
            res.render("admin/error",{err:"请输入正确的用户名密码",url:"/admin/login",date:3000});
        }
         // 测试添加用户
        // User.insertMany({ "isAdmin": true, "username": "admin", "password": "281c136bb4c72251cfa2af78963bec17"},function(err,result){
        //     console.log("成功添加");
        // })
        //数据库验证
        User.isUsernameAndPassword(fields,(result)=>{//fields实参在上面定义  result形参 实参由方法中的回调函数传回来
            if(result){
                //添加session参数
                req.session.login=1;//登录成功
                req.session.username=fields.username;
                // res.render("admin/index");
             
                res.redirect("index");
            }else{
                res.render("admin/error",{err:"请输入正确的用户名密码", url: "/admin/login", date: 6000});
            }
        })
        
// 数据库判断
    }
}

module.exports=new AdminController;