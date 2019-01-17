/**
|--------------------------------------------------
| 自定义请求方法和路径，可以直接返回静态数据，也可以mock，还能处理回调函数，类似express
|--------------------------------------------------
*/
export default {
    'POST /bigdata/user/login': (req, res) => {
        let {relationNo,userPassword}=req.body
        if(relationNo === 'admin' && userPassword === '!23qaz'){
            res.json(
                {
                    "msg": "登录成功",
                    "obj": {
                        "accountNonExpired": true,
                        "accountNonLocked": true,
                        "authorities": [],
                        "credentialsNonExpired": true,
                        "enabled": true,
                        "id": 1,
                        "menus": [{
                            "iconSelectedUrl": "",
                            "iconUrl": "icon-biaodanguanli",
                            "id": 152,
                            "name": "表单管理",
                            "parentId": -1,
                            "seq": 1,
                            "subMenus": [{
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 153,
                                "name": "表单列表",
                                "parentId": 152,
                                "seq": 2,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/formmanagement/config"
                            }, {
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 154,
                                "name": "待填表单",
                                "parentId": 152,
                                "seq": 3,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/myform/tofillin"
                            }, {
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 155,
                                "name": "表单审核",
                                "parentId": 152,
                                "seq": 4,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/myform/audit"
                            }, {
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 158,
                                "name": "数据审核",
                                "parentId": 152,
                                "seq": 5,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/myform/dataauditing"
                            }, {
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 156,
                                "name": "表单数据",
                                "parentId": 152,
                                "seq": 6,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/myform/auditdata"
                            }],
                            "tags": [],
                            "url": ""
                        }, {
                            "iconSelectedUrl": "",
                            "iconUrl": "icon-shujuguanli",
                            "id": 5,
                            "name": "数据管理",
                            "parentId": -1,
                            "seq": 7,
                            "subMenus": [{
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 6,
                                "name": "数据源管理",
                                "parentId": 5,
                                "seq": 8,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/datasource/config"
                            }, {
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 7,
                                "name": "数据集管理",
                                "parentId": 5,
                                "seq": 9,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/dataset/config"
                            }, {
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 150,
                                "name": "数据标准管理",
                                "parentId": 5,
                                "seq": 10,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/standardmanagement/config"
                            }],
                            "tags": [],
                            "url": ""
                        }, {
                            "iconSelectedUrl": "",
                            "iconUrl": "icon-xitongguanli",
                            "id": 10,
                            "name": "系统管理",
                            "parentId": -1,
                            "seq": 11,
                            "subMenus": [{
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 25,
                                "name": "账户管理",
                                "parentId": 10,
                                "seq": 12,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sys/user/manage"
                            }, {
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 26,
                                "name": "权限配置",
                                "parentId": 10,
                                "seq": 13,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sys/permission/manage"
                            }, {
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 151,
                                "name": "组织机构",
                                "parentId": 10,
                                "seq": 14,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sys/organization/manage"
                            }, {
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 157,
                                "name": "院系管理",
                                "parentId": 10,
                                "seq": 15,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sys/department/manage"
                            }, {
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 159,
                                "name": "菜单管理",
                                "parentId": 10,
                                "seq": 16,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sys/menu/manage"
                            }],
                            "tags": [],
                            "url": ""
                        }, {
                            "iconSelectedUrl": "test",
                            "iconUrl": "test",
                            "id": 160,
                            "name": "人才状态数据模板管理",
                            "parentId": -1,
                            "seq": 101,
                            "subMenus": [],
                            "tags": [],
                            "url": "/sf/mobanguanli"
                        }, {
                            "iconSelectedUrl": "test",
                            "iconUrl": "test",
                            "id": 161,
                            "name": "人才状态数据采集",
                            "parentId": -1,
                            "seq": 102,
                            "subMenus": [{
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 162,
                                "name": "0 源数据",
                                "parentId": 161,
                                "seq": 102,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/shujucaiji/0"
                            }, {
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 163,
                                "name": "1 基本信息",
                                "parentId": 161,
                                "seq": 103,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/shujucaiji/1"
                            }, {
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 164,
                                "name": "2 院校领导",
                                "parentId": 161,
                                "seq": 104,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/shujucaiji/2"
                            }, {
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 165,
                                "name": "3 基本办学条件",
                                "parentId": 161,
                                "seq": 105,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/shujucaiji/3"
                            }, {
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 166,
                                "name": "4 实践教学条件",
                                "parentId": 161,
                                "seq": 106,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/shujucaiji/4"
                            }, {
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 167,
                                "name": "5 办学经费",
                                "parentId": 161,
                                "seq": 107,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/shujucaiji/5"
                            }, {
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 168,
                                "name": "6 师资队伍",
                                "parentId": 161,
                                "seq": 108,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/shujucaiji/6"
                            }, {
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 169,
                                "name": "7 专业",
                                "parentId": 161,
                                "seq": 109,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/shujucaiji/7"
                            }, {
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 170,
                                "name": "8 教学管理与教学研究",
                                "parentId": 161,
                                "seq": 110,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/shujucaiji/8"
                            }, {
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 171,
                                "name": "9 社会评价",
                                "parentId": 161,
                                "seq": 111,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/shujucaiji/9"
                            }, {
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 172,
                                "name": "10 学生信息",
                                "parentId": 161,
                                "seq": 112,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/shujucaiji/10"
                            }, {
                                "iconSelectedUrl": "test",
                                "iconUrl": "test",
                                "id": 173,
                                "name": "11 新增数据项",
                                "parentId": 161,
                                "seq": 113,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sf/shujucaiji/11"
                            }],
                            "tags": [],
                            "url": " "
                        }],
                        "name": "Administrator",
                        "sex": 1,
                        "userId": "",
                        "username": "admin"
                    },
                    "success": true
                }
            )
        }else{
            res.json({
                "msg":"用户名或密码错误",
                "obj":null,
                "success":false
            })
        }
        

    }
}