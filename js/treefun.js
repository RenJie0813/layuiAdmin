layui.define(function(exports) {
    "use strict";
    var treefun = {
        //layui转zTree格式
        parseArr:function (data) {
            var navs = JSON.parse(JSON.stringify(data));
            var arr = [];
            for (var i = 0, len = navs.length; i < len; i++) {
                // 判断是否有子集
                if (Object.prototype.toString.call(navs[i]['children']) == '[object Array]') {
                    var childs = navs[i]['children'];
                    delete navs[i]['children'];
                    arr.push(navs[i]);
                    // 判断是否页面含有按钮
                    if (Object.prototype.toString.call(childs) != '[object Array]') { console.log("children is not a Array"); return; }
                    for (var j = 0, leng = childs.length; j < leng; j++) {
                        if (Object.prototype.toString.call(childs[j]['btns']) == '[object Array]') {
                            var btnArr = childs[j]['btns'];
                            delete childs[j]['btns'];
                            for (var k = 0, lengs = btnArr.length; k < lengs; k++) {
                                arr.push(btnArr[k]);
                            }
                        }
                        arr.push(childs[j]);
                    }
                } else {
                    arr.push(navs[i]);
                }
            }
            return arr;
    },

    removeArr:function(item,navs){
        var arr=navs.slice(0);
        for(var i=0,leng=arr.length;i<leng;i++){
            if(arr[i]==item){
                arr.splice(i,1);
                return arr;
            }
        }
    },

    //zTree转layui格式
    stringifyArr:function (data) {
        var navs = JSON.parse(JSON.stringify(data));
        var arr = [],
            childs = [],
            cache = navs.slice(0);
        // 先找出腹肌
        for (var i = 0; i < cache.length; i++) {
            cache[i]['pId'] == 0 && (arr.push(cache[i]), navs = this.removeArr(cache[i], navs));
        }
        cache = navs.slice(0);
        // 再找子集
        for (var j = 0; j < cache.length; j++) {
            cache[j]['pId'] < 10 && (childs.push(cache[j]), navs = this.removeArr(cache[j], navs));
        }
        // 然后找子集下面的页面按钮
        for (var k = 0; k < navs.length; k++) {
            for (var l = 0, leng = childs.length; l < leng; l++) {
                if (navs[k]['pId'] == childs[l]['id']) {
                    if (!childs[l]['btns']) {
                        childs[l]['btns'] = [navs[k]];
                    } else {
                        childs[l]['btns'].push(navs[k]);
                    }
                    break;
                }
            }
        }
        // 最后找父级下的子集，返回父级arr
        for (var n = 0, length = childs.length; n < length; n++) {
            for (var o = 0, len = arr.length; o < len; o++) {
                if (childs[n]['pId'] == arr[o]['id']) {
                    if (!arr[o]['children']) {
                        arr[o]['children'] = [childs[n]];
                    } else {
                        arr[o]['children'].push(childs[n]);
                    }
                    break;
                }
            }
        }
        return arr;
    }

    };

    exports('treefun', treefun);
})