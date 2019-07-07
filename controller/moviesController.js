//配置
var Controller = require("./controller");

//调用处理方法
var Movies = require("../models/Movies");


class moviesController extends Controller {
    constructor() {
        super();
    }
    //首页
    index(req, res) {
        //分页
       Movies.getGoodsDataAndCount(5, req.query.page, function (result, num) {
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/movies", req.session);
        })
    }
    del(req, res) {
       Movies.deleteOne({ "_id": req.query.id }, (err) => {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/movies", date: 3000 })
            } else {
                res.redirect('/admin/movies');
            }

        })
    }

    info(req,res){
        console.log(req.body.id)
        Movies.findOne({ "_id": req.body.id},(err,result)=>{
            if(err) throw Error(err)

            console.log(result)
            res.json(result);
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
module.exports = new moviesController;