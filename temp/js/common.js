(function () {
    /**
     * checkbox选中事件
     */
    $("#checkBoxList").on("click",".ck",function (e) {
        var node=e.target;
        if(node.nodeName=="TD"){
            $(this).children("input[type='checkbox']")[0].checked=!$(this).children("input[type='checkbox']")[0].checked;
        }else{
            $(this).checked=!$(this).checked;
        }
    });
})();

//最大下载数
const downLoadMax=100000;

/**
 * 导出
 */
function table2Excel(html,name) {
    try{
        var html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"' +
            'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
            + '<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>'
            + '</x:ExcelWorkbook></xml><![endif]-->' +
            ' <style type="text/css">' +
            'table th{'+
            'background-color: #f2f2f2;'+
            'border: 1px solid #e2e2e2;' +
            'font-size: 14px;'+
            'height: 30px;'+
            'vertical-align: middle;'+
            'text-align: center;' +
            '}'+
            'table td {' +
            'border: 1px solid #e2e2e2;' +
            'font-size: 12px;'+
            'height: 30px;'+
            'vertical-align: middle;'+
            'text-align: center;' +
            ' }' +
            '</style><meta charset=\'utf-8\' />' +
            '</head><body >'+html+'</body></html>';
        // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
        var blob = new Blob([html], { type: "application/x-xls" });
        var a = document.createElement("a");
        // 利用URL.createObjectURL()方法为a元素生成blob URL
        a.href = URL.createObjectURL(blob);
        // 设置文件名，目前只有Chrome和FireFox支持此属性
        var fileName=!!name?name+".xls":document.getElementById("table").getAttribute("name")+".xls";
        a.download = fileName;
        a.click();
        html=null;
    }
    catch (e){
        console.log(e);
        layer.msg("您的浏览器暂不支持此功能",{icon:5});
    }
}

/**
 * 列表请求
 * @param type 方法名
 * @param cb 回调
 * @param data 请求参数JSON
 */
function postList(type,cb,data) {
    var load=null,time=null;
    if(type!="GameRTPLog"){
        time=setTimeout(function () {
            load=layer.load(2, {
                shade: [0.1, "#000"],
                scrollbar: false
            });
        },100);
    }
    $.ajax({
        type:"POST",
        dataType:"JSON",
        url:url+type,
        xhr: function(){
            var xhr = $.ajaxSettings.xhr();
            xhr.withCredentials=true;
            return xhr;
        },
        data:data,
        success:function (res) {
            if(type!="GameRTPLog") {
                clearTimeout(time);
                layer.close(load);
            }
            if(res.status==205){
                layer.msg("登录超时，请重新登录",{icon:5,time:1200});
                var t=setTimeout(function () {
                    clearTimeout(t);
                    window.parent.iframelogin();
                },1200);
            }else{
                cb(res);
            }
        },
        error:function (err) {
            clearTimeout(time);
            layer.closeAll();
            layer.msg("服务器没有响应或错误",{icon:2})
            console.log(type,err);
        }
    });
}

/**
 * 弹出层关闭
 */
function closeWindow(name,cb) {
    function closeM() {
        layer.close(name);
    }
    !!cb&&cb();
    $(".resetBtn").unbind("click", closeM);
    $(".resetBtn").on("click", closeM);
}