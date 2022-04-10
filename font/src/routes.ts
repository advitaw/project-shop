import { IRouterConfig, lazy } from 'ice';
import Layout from '@/Layouts/BasicLayout';
import Login from './pages/login';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/components/NotFound'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: Layout,
    exact: true,
    children: [{
      path: '/dashboard',
      component: Dashboard,
    }, {
      path: '/',
      exact: true,
      component: Home,
    },
    {
      component: NotFound,
    }],
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
];

export default routerConfig;
