import React, { createElement, useState, useEffect } from "react";
import ProLayout from "@ant-design/pro-layout";
import { Link } from "react-router-dom";
import { asideMenuConfig } from "./menuConfig";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router";
import { Button, Popover } from "antd";
import { userInfo, globalPageList } from "@/store/index";

const loopMenuItem = (menus) =>
    menus.map(({ icon, children, ...item }) => ({
        ...item,
        icon: createElement(icon),
        children: children && loopMenuItem(children),
    }));
export default function BasicLayout({ children, location }) {
    const history = useHistory();
    const [user, setUser] = useRecoilState(userInfo);
    useEffect(() => {
        if (!user) {
            const usr: any = localStorage.getItem("usr");
            console.log("usr", usr);
            if (usr) {
                setUser(JSON.parse(usr));
            } else {
                history.push("/login");
            }
        }
    }, [user]);

    const handleQuit = () => {
        localStorage.removeItem("usr");
        setUser(null);
    };
    return (
        <ProLayout
            title="便利店管理系统"
            style={{
                minHeight: "100vh",
            }}
            location={{
                pathname: location.pathname,
            }}
            menuDataRender={() => loopMenuItem(asideMenuConfig)}
            menuItemRender={(item, defaultDom) => {
                if (!item.path) {
                    return defaultDom;
                }
                return (
                    <Link key={item.path} to={item.path}>
                        {defaultDom}
                    </Link>
                );
            }}
            headerRender={() => {
                return (
                    <div>
                        <div className="text-white absolute right-[20px]">
                            <Popover
                                placement="bottom"
                                content={
                                    <Button type="primary" onClick={handleQuit}>
                                        退出登录
                                    </Button>
                                }
                            >
                                {user?.nickName
                                    ? `您好！${user?.nickName}`
                                    : ""}
                            </Popover>
                        </div>
                    </div>
                );
            }}
        >
            <div style={{ minHeight: "60vh" }}>{children}</div>
        </ProLayout>
    );
}
