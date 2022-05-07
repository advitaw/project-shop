import Dashboard from "../pages/Dashboard";
import CustomTable from "@/pages/customTable";
import Profile from "@/pages/Profile";
import StockIn from "@/pages/stockIn";
import StockOut from "@/pages/stockOut";
import StockList from "@/pages/stockList";
import SupplierList from "@/pages/supplierList";
import OrderList from "@/pages/orderList";
import ActHistory from "@/pages/actHistory";
import ActAdd from "@/pages/actAdd";
import ActAddRule from "@/pages/actAddRule";
import VipAdd from "@/pages/vipAdd";
import VipSta from "@/pages/vipSta";
import Role from "@/pages/role";
import User from "@/pages/user";

const adminRoutes = [
    {
        path: "/sysManagement/profile",
        component: Profile,
        exact: true,
        backUrl: "/login",
    },
    {
        path: "/dashboard",
        component: Dashboard,
        exact: true,
        backUrl: "/sysManagement/profile",
    },
    {
        path: "/customTable",
        component: CustomTable,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/stockManagement/stockIn",
        component: StockIn,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/stockManagement/stockOut",
        component: StockIn,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/stockManagement/stockList",
        component: StockList,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/supplierManagement/list",
        component: SupplierList,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/supplierManagement/listManagement",
        component: OrderList,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/actManagement/history",
        component: ActHistory,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/actManagement/addRule",
        component: ActAddRule,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/actManagement/add",
        component: ActAdd,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/vip/add",
        component: VipAdd,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/vip/sta",
        component: VipSta,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/sysManagement/role",
        component: Role,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/sysManagement/user",
        component: User,
        exact: true,
        backUrl: "/dashboard",
    },
    {
        path: "/sysManagement/profile",
        component: Profile,
        exact: true,
        backUrl: "/dashboard",
    },
];

export default adminRoutes;
