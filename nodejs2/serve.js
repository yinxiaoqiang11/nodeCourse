var http=require("http");
var fs=require("fs");
var url=require("url");
var querystring = require("querystring");


var server=http.createServer(handle).listen(3000,function () {
    console.log("服务器已经跑在路上http://10.80.13.90:3000上了")
});
function handle(req,res) {
    var filePath="";
    if(req.url=="/"){
        filePath="./public/html/index.html";
        fs.exists(filePath,function (exists) {
            if(exists){
                fs.readFile(filePath,function (err,data) {
                    if(err){
                      return;
                    }else{
                        res.end(data);
                    }
                })
            }else{
                send404(res);
            }
        })
    }else if(req.url.indexOf("/form")!=-1){
        var parame=url.parse(req.url,true);
        var info=parame.query;
        var username=info.username;
        var password=info.password;
        if(req.method=="GET"){
            fs.readFile("./tsconfig.json","utf-8",function (err,data) {
                if(err){
                    return;
                }
                    var data=JSON.parse(data);
                    var user=data.user;
                console.log(user);
                   for(var i=0;i<user.length;i++){
                       if(user[i].username==username && user[i].password==password){
                           filePath="./public/html/login.html";
                       }else{
                           filePath="./public/html/reg.html";

                       }
                   }
                    fs.exists(filePath,function (exists) {
                        if(exists){
                            fs.readFile(filePath,function (err,data) {
                                if(err){
                                    return;
                                }else{
                                    res.end(data);
                                }
                            })
                        }else{
                            send404(res);
                        }
                    })

            })

        }
        else if(req.method=="POST"){
            var postDate="";
            req.on("data",function (chunk) {
                postDate+=chunk;
            });
            req.on("end",function () {
                var data=querystring.parse(postDate);
                var obj={};
                obj.username=data.username;
                obj.password=data.password;
                fs.readFile("./tsconfig.json","utf-8",function (err,data) {
                    var data=JSON.parse(data);
                    data.user.push(obj);
                    fs.writeFile("./tsconfig.json",JSON.stringify(data),function () {

                    })

                })
            });
            fs.exists("filePath",function (exists) {
                if(exists){
                    fs.readFile(filePath,function (err,data) {
                        if(err){
                            return;
                        }else{
                            res.end(data);
                        }
                    })
                }else {
                    send404(res)
                }
            })

        }
    }
    else{
        filePath="./public"+req.url;
        fs.exists(filePath,function (exists) {
            if(exists){
                fs.readFile(filePath,function (err,data) {
                    if(err){
                        return;
                    }else{
                        res.end(data);
                    }
                })
            }else{
                send404(res);
            }
        })
    }
}
function send404(res) {
    fs.readFile("./public/html/404.html",function (err,data) {
        if(err){
            return;
        }else {
            res.end(data);
        }
    })

}
