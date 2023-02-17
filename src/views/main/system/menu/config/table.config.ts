export const tableConfig = {
    pageName: 'menu',
    title: '菜单列表',
    propList: [
        { prop: 'name', label: '菜单名称', minWidth: '200' },
        { prop: 'type', label: '级别', minWidth: '60' },
        { prop: 'url', label: '路径', minWidth: '120' },
        { prop: 'icon', label: '图标', minWidth: '120' },
        { prop: 'createAt', label: '创建时间', minWidth: '180', slotName: 'create' },
        { prop: 'updateAt', label: '更新时间', minWidth: '180', slotName: 'update' },
        { label: '操作', minWidth: '140', slotName: 'handler' }
    ],
    childrenProps: {
        rowKey: 'id',
        treeProps: {
            children: 'children'
        }
    },
    showIndexColumn: false,
    showSelectColumn: false
}
