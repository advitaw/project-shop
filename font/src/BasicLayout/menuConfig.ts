interface IMenu {
    name: string;
    path: string;
    icon?: string;
    routes?: IMenu[];
}
const asideMenuConfig: IMenu[] = [
    {
        name: "数据统计",
        path: "/",
        icon: "div",
        routes: [
            {
                name: "数据大盘",
                path: "/dashboard",
            },
            {
                name: "自定义报表",
                path: "/customTable",
            },
        ],
    },
    {
        name: "库存管理",
        path: "/stockManagement",
        icon: "div",
        routes: [
            {
                name: "进货",
                path: "/stockManagement/stockIn",
            },
            {
                name: "销货",
                path: "/stockManagement/stockOut",
            },
            {
                name: "库存列表",
                path: "/stockManagement/stockList",
            },
        ],
    },
    {
        name: "供应商信息管理",
        path: "/supplierManagement",
        icon: "div",
        routes: [
            {
                name: "供应商列表",
                path: "/supplierManagement/list",
            },
            {
                name: "订单管理",
                path: "/supplierManagement/listManagement",
            },
        ],
    },
    {
        name: "活动管理",
        path: "/actManagement",
        icon: "div",
        routes: [
            {
                name: "历史活动",
                path: "/actManagement/history",
            },
            {
                name: "新增活动规则",
                path: "/actManagement/addRule",
            },
            {
                name: "新建营销活动",
                path: "/actManagement/add",
            },
        ],
    },
    {
        name: "会员信息",
        path: "/vip",
        icon: "div",
        routes: [
            {
                name: "新增会员",
                path: "/vip/add",
            },
            {
                name: "会员信息统计",
                path: "/vip/sta",
            },
        ],
    },
    {
        name: "系统管理",
        path: "/sysManagement",
        icon: "div",
        routes: [
            {
                name: "角色管理",
                path: "/sysManagement/role",
            },
            {
                name: "用户管理",
                path: "/sysManagement/user",
            },
            {
                name: "个人设置",
                path: "/sysManagement/profile",
            },
        ],
    },
];

export { asideMenuConfig };
