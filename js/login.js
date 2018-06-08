!function () {
    function size() {
        var h=window.innerHeight/2;
        var a=document.getElementById("another");
        a.style.height=h+"px";
        a.style.top=h+"px";
        var b=document.getElementById("model");
        b.style.top=(h*2-330)/2+"px";
    }
    size();
    window.addEventListener("resize",size);

    if(location.host=="112.74.41.217"){
        var line=document.getElementById("isTest");
        line.style.display="none";
    }

    var timer=null,loadIndex=null;
    var button=document.getElementById("sendCode");

    layui.use(['layer', 'form','jquery'], function() {
        var layer = layui.layer,
            $ = layui.jquery,
            form = layui.form();

        form.verify({
            pass: [
                /^[\S]{6,12}$/
                ,'请输入6到12位字符，且不能出现空格'
            ]
        });

        form.on('submit(login)',function(data){
            var name=data.field.accName;
            if(location.host!="112.74.41.217") {
                var checkCode=data.field.checkCode;
                if(!checkCode){
                    layer.msg("请输入验证码",{icon:5,time:1200});
                    return false;
                }
            }

            $.ajax({
                type:"post",
                url:url+"Login",
                data:JSON.stringify(data.field),
                dataType:"JSON",
                xhr: function(){
                    var xhr = $.ajaxSettings.xhr();
                    xhr.withCredentials=true;
                    return xhr;
                },
                success:function (res) {
                    if(res.status==0){
                        var data=res['data'];
                        if(!!data){
                            sessionStorage.setItem("adminLevel",data);
                            sessionStorage.setItem("admin",name);
                        }else{
                            layer.msg('data is not defined',{icon:5,time:1200});
                            return;
                        }
                        sessionStorage.removeItem("codeTime");
                        location.href='./index.html';
                    }else if(res.status==200){
                        layer.msg(res.msg,{icon:5,time:1200});
                    }else {
                        layer.msg(res.msg,{icon:5,time:1200});
                        console.dir(res);
                    }
                },
                error:function (xhr) {
                    console.log("error=>");
                    console.dir(xhr);
                }
            });
            return false;
        });

        button.addEventListener("click",function(){
            clearInterval(timer);
            loadIndex = layer.load();
            var time=60;
            sessionStorage.setItem("codeTime",60);
            timer=setTime(time,button);
            $.ajax({
                type:"get",
                url:url+"MobileCode?v="+Date.now(),
                xhr: function(){
                    var xhr = $.ajaxSettings.xhr();
                    xhr.withCredentials=true;
                    return xhr;
                },
                success:function (res) {
                    res=JSON.parse(res);
                    layer.close(loadIndex);
                    if(res.status==0){
                        layer.msg("验证码已发送",{icon:6,time:1200});
                    }else {
                        layer.msg(res.msg,{icon:5,time:1200});
                        console.dir(res);
                    }
                },
                error:function (xhr) {
                    console.log("error=>");
                    console.dir(xhr);
                    layer.close(loadIndex);
                }
            });
            return false;
        });

    });

    function setTime(time,button) {
        var now= setInterval(function(){
            if(time<=0){
                button.innerText="";
                button.innerText="点击重新发送";
                button.disabled=false;
                sessionStorage.removeItem("codeTime");
                clearInterval(timer);
            }else {
                button.disabled=true;
                button.innerText="";
                button.innerText="剩余时间"+(time)+"秒";
                time--;
                sessionStorage.setItem("codeTime",time);
            }
        },1000);
        return now;
    }

    !function () {
        var code=sessionStorage.getItem("codeTime");
        if(!!code&&code>0){
            clearInterval(timer);
            timer=setTime(code,button);
        }else{
            button.disabled=false;
        }
    }();

}()