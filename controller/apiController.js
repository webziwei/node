//继承
const Controller = require("./controller");
var Musics = require("../models/musics");


class ApiController extends Controller{
    constructor() {
        super();//必须初始化父类参数
        //this对象指向问题 修改this指向类原本指向路由
        // this.index=this.index.bind(this);
    }
    index(req,res){
        Musics.find(function (err, result) {
            console.log(result);
            res.json({ code: "200", msg: "数据请求成功get", result });//将数据传送到页面api接口
        })
    }
    list(req, res) {
        res.send("欢迎来到Api列表页")
    }
    getDataPost(req, res) {
        // 接口 http://127.0.0.1:3000/api/getDataPost
        Student.find(function (err, result) {
            console.log(result);
            res.json({ code: "200", msg: "数据请求成功post", result });
        })
    }


}


module.exports = new ApiController;