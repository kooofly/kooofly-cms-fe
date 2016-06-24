上传控件
列表单个删除
分页之后后退保持数据
树形结构单选选择控件
树形结构多选选择控件
树形结构列表展示控件
自定义按钮
内容管理
systemconfig list应用
批量删除

前端验证
========================
智能建表 template 建表













角色
    新增/编辑角色
    角色基本属性
    角色权限配置
    栏目1
        数据模型1
            接口1 create browse update delete
            [id roleID cataId APIId]
----------------------------------------
用户
栏目 是特殊内容? 不是
    新增/编辑栏目
    栏目基本字段
    栏目角色  角色1  角色2
内容
    新增/编辑数据模型
    数据模型基本字段
    模型接口
        接口1
            接口名称 接口1
            api
            接口类型： 私有 公共 角色

角色资源
http://127.0.0.1:3090/role/[:roleId]/collection/document/
私人资源
http://127.0.0.1:3090/user/[:userId]/collection/document/
公共资源
http://127.0.0.1:3090/public/collection/document/

get 查询
post 非幂等 多次调用接口 数据更新（创建新的副本或者更新数据的值）
put 幂等 无则插入 有则覆盖 多次调用接口（超过3次调用） 数据相同（不创建新的副本）
我的接口设计 put(url,{
    query: id,
    data: {
        id: 'xxx',
        others: 'xxxx'
    }
})

添加数据模型
post http://127.0.0.1:3090/role/admin/model/

更新数据模型
put http://127.0.0.1:3090/role/admin/model/:id

添加栏目 角色 内容 用户
post http://127.0.0.1:3090/role/[:roleId]/catagory/

更新栏目 角色 内容 用户
put http://127.0.0.1:3090/role/[:roleId]/catagory/:id

设置角色权限
put http://127.0.0.1:3090/role/[:roleId]/permission/

delete 删除

API update add
start.发起请求
next.获取API类型
next.判断API是否存在
next.是否拥有该API权限
next.数据验证
next.数据过滤
end.执行

API delete query
start.发起请求
next.获取API类型
next.判断API是否存在
next.是否拥有该API权限
end.执行


widget params 特殊字符 定义
:module = this.$route.params.module

var $prev = 'manage'
var $api = 'api'

# Create/Update Model [Page]

API:
---
Create $prev/model/create
$api/role/model
method: POST
---
Read
$api/role/model/
[$api/role/model/:id 废弃 直接从查询参数中获取]
method: GET
---
Update $prev/model/update/:id
$api/role/model
method: PUT
---


# Create/Update Catagory [Page]
$prev/同上

# Create/Update Content [Page]
$prev/同上

# Create/Update Role [Page]
$prev/同上

# Create/Update User [Page]
$prev/同上

# Create/Update Model-Article [Page]
$prev/同上

# Create/Update Model-Link [Page]
$prev/同上

# Create/Update Model-Catagory-extension [Page]
$prev/catagory/extension