const mongoose=require("mongoose");

//请求数据 http模块
const https=require("https");

// 数据库连接与服务器开启
mongoose.connect("mongodb://127.0.0.1:27017/admin1916", { useNewUrlParser: true }, function (err) {
    if (err) {
        throw Error(err);
        console.log("请检查数据库连接");
    }
})

// 数据库骨架
var musicSchema = mongoose.Schema({
    "song_id": String,//歌曲id
    "author": String,//歌手名
    "pic_small": String,//缩略图
    "title": String,//歌名
    "pic_big": String//大图
})
//建集合
var Music = mongoose.model("Music",musicSchema);

// 请求api接口，把数据导入本地数据库
// var url = `https://www.apiopen.top/satinApi?type=1&page=1`;
// var url = `https://api.apiopen.top/searchMusic?name=%22%E9%82%93%E7%B4%AB%E6%A3%8B%22`;
var url ='https://api.apiopen.top/musicRankings';

https.get(url, (res) => {
    // 数据请求一段一段接收
    var data = "";
    res.on("data", (chunk) => {
        data += chunk;
    })
    res.on("end", () => {
        // 字符串转json
        let jsondata = JSON.parse(data);
        // 把数据表里数据库
        let duanzijson = jsondata;
        let musicjson = jsondata.result[5].content;
        console.log(musicjson);
        // console.log(duanzijson[0].content[0]);

        // for (var key in musicjson) {
        //     Music.insertMany({
        //         "song_id": musicjson[key].song_id,
        //         "author": musicjson[key].author,
        //         "pic_small": musicjson[key].pic_small,
        //         "title": musicjson[key].title,
        //         "pic_big": musicjson[key].pic_big,
                
        //     }, function (err, doc) {
        //             console.log(doc[0].title + "----" + doc[0].id);
        //     })
        // }
    })
}).on("error", () => {
    console.log("数据请求失败");
})
