var formidable = require("formidable");
var sd = require("silly-datetime");
var path = require("path");
var fs = require("fs");


exports.init=function(req,callback){
    //调用表单提交插件
    var form = new formidable.IncomingForm();
    //设置缓存路径
    form.uploadDir = "./tupianhuancun";
    //调用方法获取提交的数据
    form.parse(req, (err, fields, files) => {
        if (err) {
            throw Error(err);
        }
        //判断图片大小
        var size = parseInt(files.file.size / 1024 / 1024);//字节/kb/m
        if (size > 5) {//图片大于5m提交失败删除本地数据
            fs.unlink("./" + files.file.path, function (err) {
               
                callback({ err: "图片不能超过5m" }); //回调错误信息
                return;
            })
        }
        //修改图片名称 时间戳+随机数+后缀名
        var tt = sd.format(new Date(), "YYYYMMDDHHmmss");
        var rr = parseInt(Math.random() * 89999 + 10000);
        var ext = path.extname(files.file.name);

        // 旧路径
        var oldPath = "./" + files.file.path;
        // 新路径
        var newPath = path.normalize(__dirname + "/../uploads/" + tt + rr + ext);
        // 修改
        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                throw err;
            }
            var imgurl = "/uploads/" + tt + rr + ext;
            callback({ err: 200, url: imgurl});
            // res.json({ url: imgurl });
        })
    })
}
