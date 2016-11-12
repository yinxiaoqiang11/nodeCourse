var fs = require("fs");



fs.readFile("./html/index.html","utf-8",function(err,data){
    if(err){
        return;
    }
    console.log(data)
})
// fs.rename(__dirname + "/html/lists-new.html",__dirname+"/html/list.html",function(err){
//     if(err){
//         console.log("有错误");
//     }
//     console.log("成功")
// })


fs.readFile(__dirname+"/public/test.txt","utf-8",function(err,data){
    if(err){
        return;
    }
    var data  = data;
    fs.writeFile(__dirname+"/public/test.txt","11.09"+data,"utf-8",function(err){
        if(err){
            return;
        }
        console.log("写入成功");
    })
})






fs.readdir(__dirname + "/public",function(err,files){
    if(err){
        return ;

    }
    console.log(files)
})

//__dirname,__filename
//__dirname是返回当前目录的绝对路径
//__filename 是返回当前文件的绝对路径

