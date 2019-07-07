//继承
const Controller = require("./controller");

class GoodsApiController extends Controller {
    constructor() {
        super();//必须初始化父类参数
        //this对象指向问题 修改this指向类原本指向路由
        // this.index=this.index.bind(this);
    }
    index(req, res) {
        res.send("欢迎来到商品Api首页")
    }
    list(req, res) {
        res.send("欢迎来到商品Api列表页")
    }



}


module.exports = new GoodsApiController;