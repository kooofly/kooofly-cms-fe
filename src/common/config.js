var root = 'http://api.kooofly.com:3000/resetful/'
export default {
    admin: 'admin/',
    apiRoot: root,
    menuUri: root + 'menu',
    modelUri: root + 'dynamiccollection?collectionName=',
    systemconfigUri: root + 'systemconfig',
    page: root + 'page',
    widgetData: root + 'widgetdata',
    module: {
        link: {
            // 创建新数据 保存接口
            c_create: root + 'link?_map=catagory_link_content',
            // 更新的时候 渲染的数据
            c_update_model: root + 'link?_map=catagory_link_content',
            l_columns: [
                { name: '#', field: '_id', render: 'checkbox' },
                { name: '图片', field: 'logo', render: 'picture' },
                { name: '名称', field: 'title', render: 'linkToEdit' },
                { name: '链接', field: 'link', render: 'blank' },
                { name: '打开方式', field: 'openMode' },
                { name: '是否启用', field: 'isEnable', render: 'isOrNot' }
            ],
            // 高级搜索配置
            searchArea: [
                {
                    name: 'catagoryId',
                    control: {
                        label: '分类',
                        name: 'select',
                        data: '@catagory'
                    }
                },
                {
                    name: 'title',
                    attribute: { type: 'String', required: true },
                    control: {
                        name: 'text',
                        label: '名称'
                    }
                }
            ],
            // 简单搜索配置，暂时只支持一个
            searchKey: {
                placeholder: '名称',
                name: 'title'
            }
        },
        widget: {
            l_columns: [
                { name: '#', field: '_id', render: 'checkbox' },
                { name: '名称', field: 'name', render: 'linkToEdit' },
                { name: '描述', field: 'description', }
            ]
        },
        widgetdata: {
            l_columns: [
                { name: '#', field: '_id', render: 'checkbox' },
                { name: '图片', field: 'logo', render: 'picture' },
                { name: '名称', field: 'title', render: 'linkToEdit' },
                { name: '链接', field: 'link', render: 'blank' },
                { name: '打开方式', field: 'openMode' },
                { name: '是否启用', field: 'isEnable', render: 'isOrNot' }
            ]
        },
        article: {
            // 创建新数据 保存接口
            c_create: root + 'article?_map=catagory_link_content',
            // 更新的时候 渲染的数据
            c_update_model: root + 'article?_map=catagory_link_content',
            l_columns: [
                { name: '#', field: '_id', render: 'checkbox' },
                { name: '图片', field: 'logo', render: 'picture' },
                { name: '标题', field: 'title', render: 'linkToEdit' },
                { name: '链接', field: 'link', render: 'blank' },
                { name: '打开方式', field: 'openMode' },
                { name: '是否启用', field: 'isEnable', render: 'isOrNot' }
            ]
        },
        dynamiccollection: {
            l_columns: [
                { name: '#', field: '_id', render: 'checkbox' },
                { name: '名称', field: 'name', render: 'linkToEdit' },
                { name: '表名', field: 'collectionName' },
                { name: '是否启用', field: 'isEnable', render: 'isOrNot' }
            ]
        },
        api: {
            l_columns: [
                { name: '#', field: '_id', render: 'checkbox' },
                { name: 'uri', field: 'uri', render: 'linkToEdit' },
                { name: 'method', field: 'method' },
                { name: 'owner', field: 'owner' },
                { name: 'type', field: 'type' },
                { name: '是否启用', field: 'isEnable', render: 'isOrNot' },
                { name: '操作', field: '_id', render: 'options' }
            ]
        },
        catagory: {
            l_columns: [
                { name: '#', field: '_id', render: 'checkbox' },
                { name: '名称', field: 'name', render: 'linkToEdit' },
                { name: '别名', field: 'alias' },
                { name: '是否启用', field: 'isEnable', render: 'isOrNot' },
                { name: '操作', field: '_id', render: 'options', className: 'option' }
            ]
        },
        systemconfig: {
            l_columns: [
                { name: '#', field: '_id', render: 'checkbox' },
                { name: 'Code', field: 'code', render: 'linkToEdit' },
                { name: '描述', field: 'description'  }
            ]
        },
        menu: {
            l_columns: [
                { name: '#', field: '_id', render: 'checkbox' },
                { name: '名称', field: 'name', render: 'linkToEdit' },
                { name: '别名', field: 'alias' },
                { name: '链接', field: 'link', render: 'adminLink' },
                { name: '是否启用', field: 'isEnable', render: 'isOrNot' }
            ]
        },
        page: {
            l_columns: [
                { name: '#', field: '_id', render: 'checkbox' },
                { name: '标题', field: 'title', render: 'linkToEdit' },
                { name: '布局', field: 'layout', render: 'picture', className: 'layout-image' },
                { name: '路由', field: 'router' },
                { name: '是否启用', field: 'isEnable', render: 'isOrNot' }
            ]
        }
    },
    sidebarUri: {
        catagory: root + 'catagory',
        menu: root + 'menu'
    }
}