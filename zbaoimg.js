const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");

// 数据库连接与服务器开启
mongoose.connect("mongodb://127.0.0.1:27017/admin1916", { useNewUrlParser: true }, function (err) {
    if (err) {
        throw Error(err);
        console.log("请检查数据库连接");
    }
})

// 数据库骨架
var imageSchema = mongoose.Schema({
    "alt": String,//图片ming
    "url": String,//链接
})
//建集合
var Image = mongoose.model("Image1", imageSchema);
var list = [];

function getImage(url, callback) {
    request(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            $ = cheerio.load(body);
            // console.log($)// parseHTML: root contains  merge

            var content = $(".box img");//输入标签名定位到查找提取的数据
            // var content1 = $(".lists li.list-item ul li.poster img");

            // console.log(content[0].attribs)
            // console.log(content.[0]attribs.src)
            var length = content.length;
            // var length1 = content1.length;

            //obj[k]=ccc;

            while (length--) {

                if (length > 80) {
                } else {
                    var obj = {};
           
                    obj["url"] = content[length].attribs.src2;//图片链接
                    obj["alt"] = content[length].attribs.alt;//图片名


                    list.push(obj)
                }
            }
            // console.log(list);
            // console.log(list.length)
            callback(list) //调用回调函数传递参数
        } else {
            console.info(err)
        }

    });
}
// getImage("http://sc.chinaz.com/tupian/xingkongtupian.html");

getImage("http://sc.chinaz.com/tupian/xingkongtupian.html",function(a){//存入数据
    for (var key in list) {//循环遍历存入数据
        Image.insertMany({
            "alt": list[key].alt,//图片ming
            "url": list[key].url,//链接
        }, function (err, doc) {
                console.log(doc[0].alt + "----" + doc[0].url);
        })
    }
});




