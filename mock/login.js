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
                            "iconUrl": "bars",
                            "id": 152,
                            "name": "dashboard",
                            "parentId": -1,
                            "seq": 1,
                            "subMenus": [{
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 153,
                                "name": "分析页",
                                "parentId": 152,
                                "seq": 2,
                                "subMenus": [],
                                "tags": [],
                                "url": "/dashboard/analysis"
                            }],
                            "tags": [],
                            "url": ""
                        }, {
                            "iconSelectedUrl": "",
                            "iconUrl": "bars",
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
                            }],
                            "tags": [],
                            "url": ""
                        }, {
                            "iconSelectedUrl": "",
                            "iconUrl": "bars",
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
                                "name": "权限管理",
                                "parentId": 10,
                                "seq": 13,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sys/permission/manage"
                            }, {
                                "iconSelectedUrl": "",
                                "iconUrl": "",
                                "id": 151,
                                "name": "角色管理",
                                "parentId": 10,
                                "seq": 14,
                                "subMenus": [],
                                "tags": [],
                                "url": "/sys/organization/manage"
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
                            }]
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