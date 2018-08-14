button.addEventListener('click',()=>{
    $.ajax({
        'method':'GET',
        'url':'./x',
        'headers':{
            'name':'wang',
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).then(
        (responseText)=>{
            console.log(responseText);//jquery会根据content-type智能的将响应的字符串转成对应的对象
        },
        (request)=>{
            console.log(request);
        }
    )
})