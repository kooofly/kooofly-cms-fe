export default {
    admin: 'admin/',
    apiRoot: 'http://api.kooofly.com:3000/resetful/',
    menuUri: 'http://api.kooofly.com:3000/resetful/menu',
    modelUri: 'http://api.kooofly.com:3000/resetful/dynamiccollection?collectionName=',
    listUri: {
        catagory: 'http://api.kooofly.com:3000/resetful/dynamiccollection',
    },
    listColumns: {
        catagory: [
            { name: '#', field: '_id', render: 'checkbox' },
            { name: '名称', field: 'name' },
            { name: '是否启用', field: 'isEnable', render: 'isOrNot' },
            { name: '别名', field: 'alias' },
        ],
        api: [
            { name: '#', field: '_id', render: 'checkbox' },
            { name: 'method', field: 'method' },
            { name: 'owner', field: 'owner' },
            { name: 'type', field: 'type' },
            { name: '是否启用', field: 'isEnable', render: 'isOrNot' },
        ],
        dynamiccollection: [
            { name: '#', field: '_id', render: 'checkbox' },
            { name: '名称', field: 'name' },
            { name: '表名', field: 'collectionName' },
            { name: '是否启用', field: 'isEnable', render: 'isOrNot' }
        ]
    },
    sidebarUri: {
        catagory: 'http://api.kooofly.com:3000/resetful/catagory',
        menu: 'http://api.kooofly.com:3000/resetful/menu'
    }
}