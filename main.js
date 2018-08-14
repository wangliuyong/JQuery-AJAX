//封装一个AJAX
window.jquery={}
window.$=window.jquery
jquery.ajax=function(options){
    return new Promise(function(resolve,reject){
        var request=new XMLHttpRequest();
        let {url,method,body,headers}=options
        console.log(method)
        request.open(method,url); 
        for(let key in headers){
            let value =headers[key]
            request.setRequestHeader(key,value)
        }
        request.send(body);
        
        request.onreadystatechange=function(){
            
            if(request.readyState==4){
                if(request.status < 400){
                    resolve.call(undefined,request.responseText)
                }else{
                    reject.call(undefined,request)
                }
            }
        }
    
    })
}


let button=document.getElementById("button");
let number = document.getElementById('number');

button.addEventListener('click',()=>{
    let a=$.ajax({
        'method':'post',
        'url':'./x',
        'body':'"wang":"15"',
        'headers':{
            'name':'wang',
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).then(
        (Text)=>{console.log(Text)},
        (text)=>{console.log(text.responseText)}
    )
});