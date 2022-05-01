import { SmileOutlined, HeartOutlined } from '@ant-design/icons';

const asideMenuConfig = [
  {
    name: 'home',
    path: '/',
    icon: SmileOutlined,
    routes: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: HeartOutlined,
      },
    ],
  },
  {
    name: '库存管理',
    icon: SmileOutlined,
    routes: [
      {
        name: '进货',
        path: '/stockIn',
        icon: HeartOutlined,
      },
      {
        name: '销货',
        path: '/stockOut',
        icon: HeartOutlined,
      },
      {
        name: '库存列表',
        path: '/stockList',
        icon: HeartOutlined,
      },
    ],
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: HeartOutlined,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: HeartOutlined,
  },
];

export { asideMenuConfig };
