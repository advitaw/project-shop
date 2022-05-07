import React, { createElement, useState, useEffect } from "react";
import ProLayout from "@ant-design/pro-layout";
import { Link } from "react-router-dom";
import { asideMenuConfig } from "./menuConfig";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router";
import { Button, Popover } from "antd";
import { userInfo, globalPageList } from "@/store/index";
import { cloneDeep } from "lodash";

const loopMenuItem = (menus) =>
    menus.map(({ icon, children, ...item }) => ({
        ...item,
        icon: createElement(icon),
        children: children && loopMenuItem(children),
    }));
export default function BasicLayout({ children, location }) {
    const history = useHistory();
    const [user, setUser] = useRecoilState(userInfo);
    const [pageList, setPageList] = useRecoilState(globalPageList);
    const [menu, setMenu] = useState([]);
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
    useEffect(() => {
        const tmp = cloneDeep(asideMenuConfig);
        console.log("pg", pageList);
        if (pageList?.length > 0) {
            tmp.forEach((item) => {
                if (item.routes.length > 0) {
                    for (let i = item.routes.length - 1; i > -1; i--) {
                        if (pageList.indexOf(item.routes[i].path) === -1) {
                            item.routes.splice(i, 1);
                        }
                    }
                }
            });
            for (let j = tmp.length - 1; j > -1; j--) {
                if (tmp[j].routes.length === 0) {
                    tmp.splice(j, 1);
                }
            }
        } else {
            const list: any = localStorage.getItem("list");
            if (list) {
                setPageList(JSON.parse(list));
            } else {
                //history.push("/login");
            }
        }
        console.log("asd", tmp);
        setMenu(tmp);
    }, [pageList]);

    const handleQuit = () => {
        localStorage.removeItem("usr");
        localStorage.removeItem("list");
        setUser(null);
        setPageList([]);
    };
    return (
        <ProLayout
            logo={<div></div>}
            title="便利店管理系统"
            style={{
                minHeight: "100vh",
            }}
            location={{
                pathname: location.pathname,
            }}
            menuDataRender={() => loopMenuItem(menu)}
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
