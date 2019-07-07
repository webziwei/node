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
var movieSchema = mongoose.Schema({
    "title": String,//电影名
    "release": String,//上映时间
    "rate": String,//豆瓣评分
    "duration": String,//电影时长
    "actors": String,//演员名
    "region": String,//发行地
    "trailer": String,//预告片链接
    "director":String,//导演
    "img":String//图片链接

})
//建集合
var Movie = mongoose.model("Movie", movieSchema);
var list = [];

function getMovie(url,callback) {
    request(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            $ = cheerio.load(body);
            // console.log($)// parseHTML: root contains  merge
           
            var content = $(".lists li.list-item");//输入标签名定位到查找提取的数据
            var content1 = $(".lists li.list-item ul li.poster img");
       
            // console.log(content.[0]attribs.src)
            var length = content.length;
            // var length1 = content1.length;
            
            //obj[k]=ccc;

            while (length--) {

                if (length > 80) {
                } else {
                    var obj = {};
                    obj["title"] = $(content[length]).data("title");// //电影名
                    obj["release"] = $(content[length]).data("release");//上映时间
                    obj["rate"] = $(content[length]).data("rate"); // //豆瓣评分
                    obj["duration"] = $(content[length]).data("duration"); //电影时长
                    obj["actors"] = $(content[length]).data("actors");//演员名
                    obj["region"] = $(content[length]).data("region"); //发行地
                    obj["trailer"] = $(content[length]).data("trailer");//预告片链接
                    obj["director"] = $(content[length]).data("director");//导演
                    obj["img"] = content1[length].attribs.src;//图片链接

                    list.push(obj)
                }
            }
            console.log(list);
            console.log(list.length)
            // callback(list) //调用回调函数传递参数
        } else {
            console.info(err)
        }

    });
}
getMovie("https://movie.douban.com/cinema/nowplaying/beijing/");

// getMovie("https://movie.douban.com/",function(a){//存入数据
//     for (var key in list) {//循环遍历存入数据
//         Movie.insertMany({
//             "title": list[key].title,
//             "release": list[key].release,
//             "rate": list[key].rate,
//             "duration": list[key].duration,
//             "actors": list[key].actors,
//             "region": list[key].region,
//             "trailer": list[key].trailer,
//             "director": list[key].director,
//             "img": list[key].img
//         }, function (err, doc) {
//             console.log(doc[0].title + "----" + doc[0].actors);
//         })
//     }
// });


        

