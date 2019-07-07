//配置
var Controller = require("./controller");
var sd = require("silly-datetime");

//调用处理方法
var Musics = require("../models/musics");

class musicsController extends Controller {
    constructor() {
        super();
    }
    //首页
    index(req, res) {
        //分页
        Musics.getGoodsDataAndCount(5, req.query.page, function (result, num) {
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/musics", req.session);
        })
    }
    del(req,res){
        Musics.deleteOne({"_id":req.query.id},(err)=>{
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/category", date: 3000 })
            } else {
                res.redirect('/admin/musics');
            }

        })
    }

    // //添加页
    // add(req, res) {

    //     res.render("admin/goodsAdd", req.session);
    // }

    // //添加数据
    // addPost(req, res) {
    //     Goods.insertMany(req.body, (err, result) => {
    //         if (err) {
    //             res.render("admin/error", { err: "数据操作失败", url: "/admin/category", date: 3000 })
    //             return;//直接跳出
    //         }
    //         res.redirect("/admin/goods")
    //     })
    // }
   
}
//暴露方法
module.exports = new musicsController;