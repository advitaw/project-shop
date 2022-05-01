import { IRouterConfig, lazy } from 'ice';
import Layout from '@/Layouts/BasicLayout';
import Login from './pages/login';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/components/NotFound'));
const Profile = lazy(() => import('@/pages/Profile'));

const routerConfig: IRouterConfig[] = [
  { path: '/login', exact: true, component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/dashboard', component: Dashboard, exact: true },
      { path: '/', exact: true, component: Home },
      { path: '/profile', component: Profile, exact: true },
      { component: NotFound },
    ],
  },
];

export default routerConfig;
