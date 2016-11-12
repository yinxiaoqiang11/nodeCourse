/**
 * Created by hanmingyang on 16/11/9.
 */


var http = require("http");
var fs = require("fs");

//createServer 创建一个服务器
var server = http.createServer(function(req,res){
    //console.log(req);
    //返回当前请求的地址
    // console.log(req.url)
    //返回当前请求的类型
    // console.log(req.method)
    // res.end("hello world")
    if(req.url == "/"){
        fs.readFile("./html/index.html","utf-8",function(err,data){
            if(err){
                return;
            }
            res.end(data)
        })

    }else if(req.url == "/list.html"){
        fs.readFile("./html/list.html","utf-8",function(err,data){
            if(err){
                return;
            }
            // res.writeHead(200,"content-type:"+mime.lookup(path.basename("./public/index.html")))
            res.end(data)
        })

    }else if(req.url == "/detail.html"){
        fs.readFile("./html/detail.html","utf-8",function(err,data){
            if(err){
                return;
            }
            res.end(data)
        })
    }else{
       var path = "."+req.url;
       fs.readFile(path,function(err,data){
           if(err){
               return
           }
           res.end(data);
       })
    }



})

server.listen(3000,function(){
   console.log("服务器已经跑在http://127.0.0.1:3000上")
})


