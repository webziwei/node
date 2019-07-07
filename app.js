//项目人口文件只做配置
var express=require("express");
var app=express();

var ejs= require('ejs');
var bodyParser=require("body-parser");
var session=require("express-session");
var mongoose=require("mongoose");

// 模板引擎配置
app.engine('html',ejs.__express);
app.set('view engine','html');

// 配置允许跨域
// 自定义跨域中间件
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

//post数据请求处理 body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//静态文件渲染
app.use(express.static("./public"));
app.use("/uploads", express.static("./uploads"));
app.use(express.static("./vue"));


// session配置
app.use(session({
    secret: "iloveyou", //验证 data+key
    resave: false,
    saveUninitialized: true
}))

//前台模块
app.use("/",require("./routers/Main"))

//后台模块
app.use('/admin',require("./routers/Admin"))

//api模块
app.use('/api',require("./routers/Api"));

 // 数据库连接与服务器开启
//  $mongod --dbpath e:/data/db --bind_ip 192.168.31.2 --port 27017
//  mongo --host 192.168.1.10 --port 27017
mongoose.connect('mongodb://127.0.0.1:27017/admin1916',{useNewUrlParser:true},(err)=>{
    if(err){
        throw Error(err);
        console.log("请检查数据库连接");
    }else{
        // 网络监听
        app.listen(3000, '127.0.0.1', () => console.log('请访问：http://127.0.0.1:3000'))
    }
})