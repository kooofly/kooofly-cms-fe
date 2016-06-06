export default {
    admin: 'admin/',
    apiRoot: 'http://api.kooofly.com:3000/resetful/',
    menuUri: 'http://api.kooofly.com:3000/resetful/menu',
    modelUri: 'http://api.kooofly.com:3000/resetful/dynamiccollection?collectionName=',
    listUri: {
        catagory: 'http://api.kooofly.com:3000/resetful/catagory',
    },
    listColumns: {
        catagory: [
            { name: '#', field: '_id', render: 'checkbox' },
            { name: '名称', field: 'name', render: 'linkToEdit' },
            { name: '别名', field: 'alias' },
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
        dynamiccollection: [
            { name: '#', field: '_id', render: 'checkbox' },
            { name: '名称', field: 'name', render: 'linkToEdit' },
            { name: '表名', field: 'collectionName' },
            { name: '是否启用', field: 'isEnable', render: 'isOrNot' }
        ]
    },
    sidebarUri: {
        catagory: 'http://api.kooofly.com:3000/resetful/catagory',
        menu: 'http://api.kooofly.com:3000/resetful/menu'
    }
}