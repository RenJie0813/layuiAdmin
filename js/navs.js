layui.define(function(exports) {
	"use strict";
    var navs = [{
        "name": "主页",
        "icont": "&#xe68e;",
        "spread": false,
        "href": "./temp/index.html",
        "id": 1,
        "pId": 0,
    }, {
        "name": "管理员操作",
        "icont": "&#xe612;",
        "spread": false,
        "id": 2,
        "pId": 0,
        "children": [{
            "name": "数据库清空",
            "href": "./temp/manager/deleteDataBase.html",
            "id": 21,
            "pId": 2,
        }, {
            "name": "操作员角色",
            "href": "./temp/manager/roles.html",
            "id": 22,
            "pId": 2,
            "btns":[   //btns存储页面上的按钮，ele表示按钮id
                {
                    "id":221,
                    "pId":22,
                    "name":"新增",
                    "ele":"xz"
                },
                {
                    "id":222,
                    "pId":22,
                    "name":"删除",
                    "ele":"sc"
                },
                {
                    "id":223,
                    "pId":22,
                    "name":"配置",
                    "ele":"pz"
                },
            ]
        }, {
            "name": "管理员账号",
            "href": "./temp/manager/mannager.html",
            "id": 23,
            "pId": 2,
            "btns": [{
                    "id": 231,
                    "pId": 23,
                    "name": "解冻管理员",
                    "ele": "jd"
                },
                {
                    "id": 232,
                    "pId": 23,
                    "name": "删除",
                    "ele": "sc"
                },
                {
                    "id": 233,
                    "pId": 23,
                    "name": "修改",
                    "ele": "xg"
                },
                {
                    "id": 234,
                    "pId": 23,
                    "name": "冻结管理员",
                    "ele": "dj"
                },
                {
                    "id": 235,
                    "pId": 23,
                    "name": "重置密码",
                    "ele": "cz"
                },
                {
                    "id": 236,
                    "pId": 23,
                    "name": "新增管理员",
                    "ele": "xz"
                },
                {
                    "id": 237,
                    "pId": 23,
                    "name": "锁定时间",
                    "ele": "sd"
                }
            ]
        }, {
            "name": "内服ID",
            "href": "./temp/manager/id.html",
            "id": 24,
            "pId": 2
        }, {
            "name": "管理员日志",
            "href": "./temp/manager/mannerLog.html",
            "id": 25,
            "pId": 2,
        }
        // , {
        //     "name": "系统统计",
        //     "href": "./temp/manager/systemCount.html",
        //     "id": 26,
        //     "pId": 2,
        // }
        ]
    }, {
        "name": "充值管理",
        "icont": "&#xe65e;",
        "spread": false,
        "id": 3,
        "pId": 0,
        "children": [{
            "name": "充值记录",
            "href": "./temp/pay/orderRecords.html",
            "id": 31,
            "pId": 3,
        }, {
            "name": "赠送金币记录",
            "href": "./temp/pay/sendRecords.html",
            "id": 32,
            "pId": 3
        }]
    }, {
        "name": "用户管理",
        "icont": "&#xe770;",
        "href": "#",
        "spread": false,
        "id": 4,
        "pId": 0,
        "children": [{
            "name": "用户信息",
            "href": "./temp/userManager/userInfo.html",
            "id": 41,
            "pId": 4,
            "btns": [
                {
                    "id": 411,
                    "pId": 41,
                    "name": "新增内服ID",
                    "ele": "xz"
                },
                {
                    "id": 412,
                    "pId": 41,
                    "name": "赠送Svip",
                    "ele": "svip"
                },
                {
                    "id": 413,
                    "pId": 41,
                    "name": "赠送金币",
                    "ele": "zs"
                },
                {
                    "id": 414,
                    "pId": 41,
                    "name": "踢人下线",
                    "ele": "tr"
                },
                {
                    "id": 415,
                    "pId": 41,
                    "name": "冻结",
                    "ele": "dj"
                },
                {
                    "id": 416,
                    "pId": 41,
                    "name": "解冻",
                    "ele": "jd"
                },
                {
                    "id": 417,
                    "pId": 41,
                    "name": "清除微信绑定",
                    "ele": "qc"
                },
                {
                    "id": 418,
                    "pId": 41,
                    "name": "转移金币",
                    "ele": "zy"
                }
            ]
        }, {
            "name": "关注用户",
            "href": "./temp/userManager/attentionUser.html",
            "id": 42,
            "pId": 4,
            "btn": [{
                "id": 421,
                "pId": 42,
                "name": "刷新",
                "ele": "sx"
            },
            {
                "id": 422,
                "pId": 42,
                "name": "删除",
                "ele": "sc"
            }
            ]
        }, {
            "name": "游戏记录",
            "href": "./temp/userManager/intoRecords.html",
            "id": 43,
            "pId": 4,
        // }, {
        //     "name": "游戏记录",
        //     "href": "./temp/userManager/gameRecords.html",
        //     "id": 44,
        //     "pId": 4,
        }, {
            "name": "金币记录",
            "href": "./temp/userManager/moneyManager.html",
            "id": 45,
            "pId": 4,
        }, {
            "name": "转账记录",
            "href": "./temp/userManager/outRecords.html",
            "id": 46,
            "pId": 4
        }, {
            "name": "邮件管理",
            "href": "./temp/userManager/emailManager.html",
            "id": 47,
            "pId": 4,
            "btn": [{
                "id": 471,
                "pId": 47,
                "name": "新增邮件",
                "ele": "xz"
            },
            {
                "id": 472,
                "pId": 47,
                "name": "删除",
                "ele": "sc"
            }
            ]
        }, {
            "name": "解冻记录",
            "href": "./temp/userManager/jdRecords.html",
            "id": 48,
            "pId": 4,
        }, {
            "name": "转移金币记录",
            "href": "./temp/userManager/moveRecords.html",
            "id": 49,
            "pId": 4,
        }, {
            "name": "银行存取记录",
            "href": "./temp/userManager/bankManager.html",
            "id": 491,
            "pId": 4
        }]
    }, {
        "name": "运营数据",
        "icont": "&#xe62c;",
        "href": "#",
        "spread": false,
        "id": 5,
        "pId": 0,
        "children": [{
            "name": "数据汇总",
            "href": "./temp/operation/allData.html",
            "id": 51,
            "pId": 5
        }, {
            "name": "活跃用户",
            "href": "./temp/operation/liveUser.html",
            "id": 52,
            "pId": 5
        }, {
            "name": "流失用户",
            "href": "./temp/operation/loseUser.html",
            "id": 53,
            "pId": 5
        }, {
            "name": "新增玩家",
            "href": "./temp/operation/addUser.html",
            "id": 54,
            "pId": 5
        }, {
            "name": "玩家留存",
            "href": "./temp/operation/saveUser.html",
            "id": 55,
            "pId": 5
        }
        //,{
        //     "name": "实时在线",
        //     "href": "./temp/operation/online.html",
        //     "id": 56,
        //     "pId": 5
        // }, {
        //     "name": "付费转化",
        //     "href": "./temp/operation/payChange.html",
        //     "id": 57,
        //     "pId": 5
        // },{
        //     "name": "游戏时长",
        //     "href": "./temp/operation/playingTime.html",
        //     "id": 58,
        //     "pId": 5
        // },{
        //     "name": "充值排行",
        //     "href": "./temp/operation/payRanking.html",
        //     "id": 59,
        //     "pId": 5
        // }, {
        //     "name": "事件数据",
        //     "href": "./temp/operation/eventData.html",
        //     "id": 591,
        //     "pId": 5
        // }
        ]
    }, {
        "name": "游戏控制与配置",
        "icont": "&#xe631;",
        "href": "#",
        "spread": false,
        "id": 6,
        "pId": 0,
        "children": [{
            "name": "游戏总控制",
            "href": "./temp/gameControl/all.html",
            "id": 61,
            "pId": 6
        }, {
            "name": "大厅配置",
            "href": "./temp/gameConfig.html",
            "id": 62,
            "pId": 6,
            "btns": [{
                "id": 621,
                "pId": 62,
                "name": "注册配置",
                "ele": "zcpzBtn"
            }, {
                "id": 622,
                "pId": 62,
                "name": "注册限制",
                "ele": "zcxzBtn"
            }, {
                "id": 623,
                "pId": 62,
                "name": "喇叭配置",
                "ele": "lbpzBtn"
            }, {
                "id": 624,
                "pId": 62,
                "name": "银行配置",
                "ele": "yhpzBtn"
            }, {
                "id": 625,
                "pId": 62,
                "name": "充值配置",
                "ele": "czpzBtn"
            }]
        }, {
            "name": "欢乐三张",
            "href": "./temp/gameControl/three.html",
            "id": 63,
            "pId": 6,
        }, {
            "name": "大闹天宫",
            "href": "./temp/gameControl/fish.html",
            "id": 64,
            "pId": 6,
        }, {
            "name": "多福多财",
            "href": "./temp/gameControl/dfdc.html",
            "id": 65,
            "pId": 6,
        }, {
            "name": "皇室冲突",
            "href": "./temp/gameControl/pk.html",
            "id": 66,
            "pId": 6,
        }, {
            "name": "百人斗牛",
            "href": "./temp/gameControl/brdn.html",
            "id": 67,
            "pId": 6,
        }, {
            "name": "抢庄牛牛",
            "href": "./temp/gameControl/qznn.html",
            "id": 68,
            "pId": 6,
        }, {
            "name": "九线水果机",
            "href": "./temp/gameControl/sgj.html",
            "id": 69,
            "pId": 6,
        }, {
            "name": "五龙争霸",
            "href": "./temp/gameControl/WLZB.html",
            "id": 691,
            "pId": 6,
        }, {
            "name": "白蛇传",
            "href": "./temp/gameControl/whiteSnake.html",
            "id": 692,
            "pId": 6,
        }, {
            "name": "欢乐捕鱼",
            "href": "./temp/gameControl/happyFish.html",
            "id": 693,
            "pId": 6,
        }]
    }, {
        "name": "游戏统计",
        "icont": "&#xe629;",
        "href": "#",
        "spread": false,
        "id": 8,
        "pId": 0,
        "children": [{
            "name": "用户与支付统计",
            "href": "./temp/gameCount/userPayCount.html",
            "id": 81,
            "pId": 8
        }, {
            "name": "总数据统计",
            "href": "./temp/gameCount/dataCount.html",
            "id": 82,
            "pId": 8
        }, {
            "name": "总充值统计",
            "href": "./temp/gameCount/payCount.html",
            "id": 83,
            "pId": 8,
        }, {
            "name": "捕鱼统计",
            "href": "./temp/gameCount/fishCount.html",
            "id": 84,
            "pId": 8
        }, {
            "name": "排行榜",
            "href": "./temp/gameCount/ranking.html",
            "id": 85,
            "pId": 8
        }, {
            "name": "统计",
            "href": "./temp/gameCount/allCount.html",
            "id": 86,
            "pId": 8
        }, {
            "name": "玩家游戏详情",
            "href": "./temp/gameCount/playerGameInfo.html",
            "id": 87,
            "pId": 8
        }]
    },
    {
        "name": "公告管理",
        "icont": "&#xe645;",
        "href": "#",
        "spread": false,
        "id": 9,
        "pId": 0,
        "children": [{
            "name": "公告",
            "href": "./temp/msgManager/notice.html",
            "id": 91,
            "pId": 9
        }, {
            "name": "消息推送",
            "href": "./temp/msgManager/push.html",
            "id": 92,
            "pId": 9
        }, {
            "name": "跑马灯控制",
            "href": "./temp/msgManager/marquee.html",
            "id": 93,
            "pId": 9
        }]
    },
    {
        "name": "SVIP模块",
        "icont": "&#xe600;",
        "href": "#",
        "spread": false,
        "id": 10,
        "pId": 0,
        "children":[
            {
                "name":"SVIP管理",
                "href":"./temp/boss/boss.html",
                "id":101,
                "pId":10
            },
            {
                "name":"SVIP转账统计",
                "href":"./temp/boss/bossTransfer.html",
                "id":102,
                "pId":10
            }
        ]
    },
    {
        "name": "留言管理",
        "icont": "&#xe611;",
        "href": "./temp/userMsg/index.html",
        "spread": false,
        "id": 11,
        "pId": 0
    },
    {
        "name": " 推广码管理",
        "icont": "&#xe641;",
        "href": "#",
        "spread": false,
        "id": 12,
        "pId": 0,
        "children": [{
            "name": "推广码生成",
            "href": "./temp/promotion/index.html",
            "id": 121,
            "pId": 12
        }, {
            "name": "推广码统计",
            "href": "./temp/promotion/promotionList.html",
            "id": 122,
            "pId": 12
        }]
    }
    ];
	exports('navs', navs);
});