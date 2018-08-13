//封装一个AJAX
window.jquery={}
window.$=window.jquery
window.jquery.ajax=function(options){
    //利用arguements判断，使函数可以接受两种类型的参数
    let url;
    if(arguments.length===1){
       url=options.url;
    }else if(arguments.length===2){
        url=arguments[0]
        options=arguments[1]
    }
    let method=options.method,
        body=options.body,
        succedFn=options.succedFn,
        failFn=options.failFn,
        headers=options.headers;
    

    let request=new XMLHttpRequest();//声明一个请求对象,XMLHttpRequest是浏览器给出的一个用来进行请求相关的接口
    
    
    request.open(method,url) //配置这个请求1.方式2.路径3.是否异步，默认异步。
    //open之后readystate已经变成了1
    for(let key in headers){
        let value =headers[key]
        request.setRequestHeader(key,value)
    }
    //request.send()//发送这个请求
    request.send(body)
    request.onreadystatechange = function () {
        if(request.readyState===4){//request.readyState返回请求的状态包括：0（open方法还未调用）1（send方法还未调用）2（send方法被掉用，已经获得响应头和状态码）3（正在下载响应体，responseText已经获得部分数据）4（整个请求已经完成）
            if (request.status >= 400) { //request.status返回状态码。request.statusText 
                failFn.call(null,request)
            } else {
                succedFn.call(null,request.responseText)
                //思考：如果请求失败的话，responseText 存在。
                //主要服务器返回什么内容，即使状态码返回的是404，服务器也会返回内容，例如返回：response.write(`{'error':'not found'}`)
            }
        } 
        
    } //请求的状态发生改变事件
}

let button=document.getElementById("button");
let number = document.getElementById('number');

button.addEventListener('click',()=>{
    $.ajax({
        'method':'GET',
        'url':'./index.html',
        'body':'"wang":"15"',
        'headers':{
            'name':'wang',
            'Content-Type':'application/x-www-form-urlencoded'
        },
        'succedFn': (request)=>{console.log(request)},//同时传两个函数{f1.call(null,request);f2.call(null,request)}
        'failFn': (request)=>{console.log(request);console.log(request.responseText)}
    })
})