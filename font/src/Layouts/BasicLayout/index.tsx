import { createElement, useState, useEffect } from 'react';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import { Link } from 'ice';
import { asideMenuConfig } from './menuConfig';

const loopMenuItem = (menus) =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: createElement(icon),
    children: children && loopMenuItem(children),
  }));

export default function BasicLayout({ children, location }) {
  const [menu, setMenu] = useState<any[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setMenu(asideMenuConfig);
    }, 1000);
  }, []);
  return (
    <ProLayout
      title="便利店管理系统"
      style={{
        minHeight: '100vh',
      }}
      location={{
        pathname: location.pathname,
      }}
      menuDataRender={() => loopMenuItem(menu)}
      menuItemRender={(item, defaultDom) => {
        if (!item.path) {
          return defaultDom;
        }
        return <Link to={item.path}>{defaultDom}</Link>;
      }}
      headerRender={() => {
        return (
          <div>
            <div className="text-white absolute right-[20px]">123</div>
          </div>
        );
      }}
    >
      <div style={{ minHeight: '60vh' }}>{children}</div>
    </ProLayout>
  );
}
