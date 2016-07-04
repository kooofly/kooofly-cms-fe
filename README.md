目录结构说明
com 非通用组件
widgets 通用组件
controls form表单组件
plugs 插件 定制页面特殊功能

页面类型
全自动 半自动 手写
全自动： 完全由后端配置生成： area管理
半自动： 部分由后端配置完成： 部分使用area管理
手写：   完全不使用area管理 （使用模板系统编写） TODO 抽取通用模板系统组件

TODO
全自动页面实现
搜索区域实现
ueditor 异步请求
ueditor 后退之后错误问题修复
Q&A API手册（多文章 单列表）

前端场景实现
1. 员工手册 Q&A API手册（多文章 单列表）
3. 可配置 多area
4. 前端规范
5. CMS列表页
6. CMS详情页 （文章 评论）
7. CMS首页
一个页面多个模块组成 首页
列表页（查询） 详情页
组合操作页面
登录 注册 找回密码 等
area管理
log
widget管理
__v 版本控制
统一数据格式
安装数据完善
批量操作
排序
多条map查询
批处理


列表单个删除
分页之后后退保持数据
树形结构单选选择控件
树形结构多选选择控件
树形结构列表展示控件
自定义按钮
内容管理
systemconfig list应用
批量删除
上传控件

前端验证
========================
智能建表 template 建表


===================================================================================


栏目的列表页 详情页 模板通过 栏目的link属性搞定 所以栏目的类型可以不需要了 不需要有单页单面类型


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