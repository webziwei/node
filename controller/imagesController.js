//配置
var Controller = require("./controller");

//调用处理方法
var Images = require("../models/Images");


class imagesController extends Controller {
    constructor() {
        super();
    }
    //首页
    index(req, res) {
        //分页
        Images.find({},(err,result)=>{
            req.session.result = result;
            res.render("admin/blueimp", req.session);
        })
           
       
    }
    // del(req, res) {
    //     Movies.deleteOne({ "_id": req.query.id }, (err) => {
    //         if (err) {
    //             res.render("admin/error", { err: "数据操作失败", url: "/admin/movies", date: 3000 })
    //         } else {
    //             res.redirect('/admin/movies');
    //         }

    //     })
    // }

    // info(req, res) {
    //     console.log(req.body.id)
    //     Movies.findOne({ "_id": req.body.id }, (err, result) => {
    //         if (err) throw Error(err)

    //         console.log(result)
    //         res.json(result);
    //     })

    // }


}
//暴露方法
module.exports = new imagesController;