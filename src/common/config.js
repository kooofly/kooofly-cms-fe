var root = 'http://api.kooofly.com:3000/resetful/'
export default {
    admin: 'admin/',
    apiRoot: root,
    menuUri: root + 'menu',
    modelUri: root + 'dynamiccollection?collectionName=',
    systemconfigUri: root + 'systemconfig',
    listUri: {
        catagory: root + 'catagory',
    },
    listColumns: {
        dynamiccollection: [
            { name: '#', field: '_id', render: 'checkbox' },
            { name: '名称', field: 'name', render: 'linkToEdit' },
            { name: '表名', field: 'collectionName' },
            { name: '是否启用', field: 'isEnable', render: 'isOrNot' }
        ],
        api: [
            { name: '#', field: '_id', render: 'checkbox' },
            { name: 'uri', field: 'uri', render: 'linkToEdit' },
            { name: 'method', field: 'method' },
            { name: 'owner', field: 'owner' },
            { name: 'type', field: 'type' },
            { name: '是否启用', field: 'isEnable', render: 'isOrNot' },
        ],
        catagory: [
            { name: '#', field: '_id', render: 'checkbox' },
            { name: '名称', field: 'name', render: 'linkToEdit' },
            { name: '别名', field: 'alias' },
            { name: '是否启用', field: 'isEnable', render: 'isOrNot' }
        ],
        systemconfig: [
            { name: '#', field: '_id', render: 'checkbox' },
            { name: 'Code', field: 'code', render: 'linkToEdit' },
            { name: '类型', field: 'type' },
            { name: '描述', field: 'description'  }
        ],
        article: [

        ]
    },
    sidebarUri: {
        catagory: 'http://api.kooofly.com:3000/resetful/catagory',
        menu: 'http://api.kooofly.com:3000/resetful/menu'
    }
}