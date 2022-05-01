import Dashboard from "../pages/Dashboard";

const adminRoutes = [
    {
        path: "/dashboard",
        component: Dashboard,
        exact: true,
        role: "admin",
        backUrl: "/login",
    },
];

export default adminRoutes;
