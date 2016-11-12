/**
 * Created by lanou on 16/11/10.
 */
/**
 * Created by hanmingyang on 16/11/10.
 */


var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer(handle).listen(3000);

function handle(req,res){
    var filePath = "";
    if(req.url == "/"){
        filePath = "./public/html/index.html"


        fs.exists(filePath,function(exists){
            if(exists){
                fs.readFile(filePath,function(err,data){
                    if(err){
                        return;
                    }
                    res.end(data);
                })
            }else{
                send404(res);
            }
        })
    }else if(req.url.indexOf("/form") != -1 ){

        var parme = url.parse(req.url,true);
        var info = parme.query;
        var username = info.username;
        var password = info.password;

        fs.readFile("./tsconfig.json","utf-8",function(err,data){
            if(err){
                return;
            }
            var data = JSON.parse(data);
            if(data.username  == username && data.password == password){
                //有此账户
                filePath = "./public/html/login.html"
            }else{
                filePath = "./public/html/reg.html"
            }

            fs.exists(filePath,function(exists){
                if(exists){
                    fs.readFile(filePath,function(err,data){
                        if(err){
                            return;
                        }
                        res.end(data);
                    })
                }else{
                    send404(res);
                }
            })
        })



    }else{
        filePath = "./public" + req.url;
        fs.exists(filePath,function(exists){
            if(exists){
                fs.readFile(filePath,function(err,data){
                    if(err){
                        return;
                    }
                    res.end(data);
                })
            }else{
                send404(res);
            }
        })
    }


}

function send404(res){
    fs.readFile("./public/html/404.html",function(err,data){
        if(err){
            return;
        }
        res.end(data);
    })
}