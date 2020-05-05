export default [
    {
        title: '主页',
        key: '/home',
    },
    {
        title: '商品',
        key: '/products',
        children: [
            {
                title: '品类管理',
                key: '/category',
            },
            {
                title: '商品管理',
                key: '/product',
            },
        ]
    },
    {
        title: '角色',
        key: '/role',
    },
]