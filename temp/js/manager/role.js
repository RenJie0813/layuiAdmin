layui.config({
    base: '../../js/',
//  version:new Date().getTime()
}).use(['layer', 'form','element','laypage','treefun','navs'], function() {
    var element = layui.element,form=layui.form,laypage = layui.laypage,
    layer = layui.layer,
    navall=layui.navs,
    treefun=layui.treefun;
    form.on("submit(search)",function (e) {
        renderList(JSON.stringify(e.field));
        return false;
    });
    form.on('checkbox(all)', function(data){
        var isCheck=data.elem.checked;
        var checks=$("#checkBoxList input[type='checkbox']:not(#all)");
        for(var i=0,length=checks.length;i<length;i++){
            checks[i].checked=isCheck;
        }
    });

    //Click
    $("#alist").on("click","a",function () {
        var type=$(this).attr("id");
        var checked=document.querySelectorAll("input[type='checkbox']:checked:not(#all)");
        switch(type){
            case 'xz':
                var html=$("#tree").html();
                var pwd = layer.open({
                    type: 1,
                    title:"新增角色",
                    skin:"dl",
                    content: html,
                    closeBtn: 1,
                    area: ["26rem",'auto']
                });
                createTree(treefun.parseArr(navall));
                closeWindow(pwd);
                break;
            case 'pz':
                if(checked.length!=1){layer.msg('只能选择一个角色',{icon:7});return;}
                else {
                    if($(this).attr("data-i")=="disabled"){return;}
                    $(this).attr("data-i","disabled");
                    postList("GetRoleData",function (res) {
                       $("#pz").attr("data-i","false");
                       if(res.status==0){
                           var nav=treefun.parseArr(JSON.parse(res.data));
                           var navs=treefun.parseArr(navall);
                           var type=checked[0].dataset['i'];
                           var html=$("#tree").html();
                           var pwd = layer.open({
                               type: 1,
                               title:type+"权限配置",
                               skin:"dl",
                               content: html,
                               closeBtn: 1,
                               area: ["26rem",'auto']
                           });
                           $("#name").val(type).attr('readonly',true);
                           for(var i=0,leng=nav.length;i<leng;i++){
                               for(var j=0,lengs=navs.length;j<lengs;j++){
                                    if(nav[i]['id']==navs[j]['id']){
                                        navs[j]['checked']=true;
                                        break;
                                    }
                               }
                           }
                           createTree(navs,1);
                           navs=null;
                           closeWindow(pwd);
                       }else{
                           console.log(res);
                       }
                    },JSON.stringify({
                        roleType:checked[0].dataset['i']
                    }));
                }
                break;
            case 'sc':
                if(checked.length==0){layer.msg('请选择一个或多个角色',{icon:7});return;}
                else {
                    postList("DelRole",function (res) {
                        if(res.status==0){
                             layer.msg("删除成功",{icon:6,time:1200});
                             renderList();
                        }else{
                            layer.msg(res.msg,{icon:5,time:1200});
                        }
                    },JSON.stringify({
                        types:getCheckName(checked)
                    }));
                }
                break;
        }
    });

    //渲染
    var nums=5,curr=1;
    function render(data, curr){
        var arr = []
            ,thisData = data.concat().splice(curr*nums-nums, nums);if(data.length==0){return "<tr id=\"load-tr\"><td colspan=\"16\"><p class=\"load\">暂无数据</p></td></tr>";}
        layui.each(thisData, function(index, item){
            arr.push("<tr><td class='ck'><input type='checkbox' data-i='"+item.roleType+"' lay-ignore/></td><td>"+(parseInt(index)+1+nums*(curr-1))+"</td><td>"+item.roleType+"</td><td>"+item.addAuthor+"</td><td>"+new Date(item.addTime).format("yyyy-MM-dd hh:mm:ss")+"</td></tr>");
        });
        return arr.join('');
    };
    
//  renderList();

    //渲染方法
    function renderList(name) {
        curr=1;
        postList("GetRole",function (res) {
            $("#load-tr").hide();
            if(res.status==0){
                var data=JSON.parse(res.data);
                //调用分页
                laypage({
                    cont: 'pages'
                    ,pages: Math.ceil(data.length/nums) //得到总页数
                    ,groups: nums //连续显示分页数
                    ,skip:true,last:Math.ceil(data.length/nums)
                    ,jump: function(obj,first){
                        document.getElementById('checkBoxList').innerHTML = render(data, obj.curr);
                        curr=obj.curr;
                        form.render();
                    }
                });
            }else{
                layer.msg(res.msg,{icon:5,time:1200});
            }
        },name||null);
    }

    //初始化tree
    function createTree(data,type) {
        var nav=type==1?data:JSON.parse(JSON.stringify(data));
        var treeNode = $.fn.zTree.init($("#treeDemo"), {
            view: {
                selectedMulti: false
            },
            check: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        }, treefun.parseArr(nav));

        //绑定提交事件
        $("#getCheck").click(function() {
           var name=$("#name").val();
           if(!name){layer.msg("请输入角色名",{icon:5,time:1200});return;}
            var node = treeNode.getCheckedNodes(),
                checkArr = [],
                sendArr = [];
            for (var i = 0, leng = node.length; i < leng; i++) {
                checkArr.push(node[i]['id']);
            }
            if(checkArr.length==0){
                layer.msg("请选择权限配置",{icon:5,time:1200});
                return;
            }
            var data = JSON.parse(JSON.stringify(treefun.parseArr(navall)));
            for (var k = 0, len = checkArr.length; k < len; k++) {
                for (var j = 0, lengs = data.length; j < lengs; j++) {
                    if (checkArr[k] == data[j]['id']) {
                        data[j]['checked']=true;
                        sendArr.push(data[j]);
                        break;
                    }
                }
            }
            if(type==1){
                postList("ModifyRole",function (res) {
                    if(res.status==0){
                        layer.closeAll();
                        layer.msg("配置修改成功",{icon:6});
                    }else if(res.status==204){
                        layer.msg(res.msg,{icon:5,time:1200});
                    }else{
                        console.dir(res);
                    }
                },JSON.stringify({
                    roleType:name,
                    roleData:JSON.stringify(treefun.stringifyArr(sendArr))
                }));
            }else{
                postList("Addrole",function (res) {
                    renderList();
                    if(res.status==0){
                        layer.closeAll();
                        layer.msg("角色添加成功",{icon:6});
                    }else if(res.status==204){
                        layer.msg(res.msg,{icon:5,time:1200});
                    }else{
                        console.dir(res);
                    }
                },JSON.stringify({
                    roleType:name,
                    roleData:JSON.stringify(treefun.stringifyArr(sendArr))
                }));
            }
        });
    }
});
