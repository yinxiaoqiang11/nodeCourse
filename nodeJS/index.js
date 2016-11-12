var http=require("http");
var fs=require("fs");



var server=http.createServer(function (request,response) {
    if(request.url=="/"){
        fs.readFile("./html/index.html","utf-8",function (err,data) {
            if(err){
                return;
            }else{
                response.end(data)
            }
        })
    }
    else if(request.url=="/a.html"){
            fs.readFile("./html/a.html","utf-8",function (err,data) {
                if (err) {
                    return;
                } else {
                    response.end(data)
                }

            })
    }else if(request.url=="/b.html"){
            fs.readFile("./html/b.html","utf-8",function (err,data) {
                if (err) {
                    return;
                } else {
                    response.end(data)
                }
            })
    }else {
        var path = "."+request.url;
        fs.readFile(path,function(err,data){
            if(err){
                return
            }
            res.end(data);
        })
    }
});

server.listen(3000,function () {
   console.log("服务器已经跑在http://127.0.0.1:3000上了")
});
