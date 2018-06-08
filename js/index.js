var tab;
layui.config({
	base: 'js/',
	version:false//new Date().getTime()
}).use(['element', 'layer', 'navbar', 'tab','form'], function() {
	var element = layui.element,
        form=layui.form,
		navbar = layui.navbar(),
        layer = layui.layer;
		tab = layui.tab({
			elem: '.admin-nav-card', //设置选项卡容器
			maxSetting: {
				max: 15,
				tipMsg: '最多只能打开15个选项卡！'
			},
			contextMenu:true
		});
        
        var adminLevel='super';//sessionStorage.getItem('adminLevel');
        if(adminLevel=='super'){
            layui.config({
                base: 'js/',
                version:new Date().getTime()
            }).use(['navs'], function(){
                renderMenu(layui.navs);
            });
        }else if(!adminLevel){
            layer.msg("您还未登录，即将为您跳转",{icon:5,time:1200});
            var t=setTimeout(function () {
                clearTimeout(t);
                location.href="./login.html";
            },1400);
        }else{
            var loading=layer.load();
            renderMenu(JSON.parse(adminLevel));
        }
        form.verify({
           pwd:[
                /^[\S]{6,12}$/
                ,'密码必须6到12位，且不能出现空格'
            ]
        });

        $("#msg>b").text(sessionStorage.getItem('admin'));

        form.on("submit(pwd)",function (e) {
            var oldPwd=$("#oldPwd").val(),newPwd=$("#newPwd").val();
            if(oldPwd==newPwd){
                layer.msg("新密码与旧密码相同，请重新输入",{icon:5,time:1200});
                return false;
            }
            if(newPwd!=$("#checkPwd").val()){
                layer.msg("两次输入密码不一致，请重新输入",{icon:5,time:1200});
                return false;
            }
            postList("UpdatePwd",function (res) {
                if(res.status==0){
                    layer.closeAll();
                    layer.msg("密码修改成功，请重新登录",{icon:6,time:1200});
                    var t=setTimeout(function () {
                        clearTimeout(t);
                        $("#changeUser").click();
                    },1200);
                }else{
                    layer.msg(res.msg,{icon:5,time:1200});
                }
            },JSON.stringify({
                oldPwd:oldPwd,
                newPwd:newPwd
            }));
            return false;
        });

        $("#changePwd").click(function () {
            if(sessionStorage.getItem('adminLevel')=="super"){
                layer.msg("你的身份极其重要，是不能被更改的",{icon:0});
                return false;
            }
            var html=$("#change").html();
            var pwd = layer.open({
                type: 1,
                title:"修改密码",
                content: html,
                closeBtn: 1,
                area: ["22rem"]
            });
            closeWindow(pwd);
        });
        $("#changeUser").click(function () {
            sessionStorage.removeItem("adminLevel");
            location.href="./login.html";
        });

        //iframe自适应
        $(window).on('resize', function() {
            var $content = $('.admin-nav-card .layui-tab-content');
            $content.height($(this).height() - 147);
            $content.find('iframe').each(function() {
                $(this).height($content.height());
            });
        }).resize();

        //手机设备的简单适配
        var treeMobile = $('.site-tree-mobile'),
            shadeMobile = $('.site-mobile-shade');
        treeMobile.on('click', function() {
            $('body').addClass('site-mobile');
        });
        shadeMobile.on('click', function() {
            $('body').removeClass('site-mobile');
        });

        /**
         * 菜单渲染
         * @param data
         */
        function renderMenu(data) {
            //设置navbar
            navbar.set({
                spreadOne: true,
                elem: '#admin-navbar-side',
                cached: true,
                data: data
                // url: './nav.json'
            });

            //渲染navbar
            navbar.render();
            //监听点击事件
            navbar.on('click(side)', function(data) {
                tab.tabAdd(data.field);
            });
            var dl=$("#admin-navbar-side>ul .layui-nav-child")[0];
            !!dl&&$(dl).parent().addClass("layui-nav-itemed");
            layer.close(loading);
        }
        /**
         * 关闭当前窗口
         */
        function closeWindow(name) {
            function closeM() {
                layer.close(name);
            }

            $(".resetBtn").unbind("click", closeM);
            $(".resetBtn").on("click", closeM);
        }

        window.iframelogin=function () {
            location.href="./login.html";
        }
});