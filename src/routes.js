import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/admin';
import SimpleLayout from './layouts/simple';

// ----------------------------------------------------------------------
import BlogPage from './pages/adminPage/BlogPage';
import UserPage from './pages/adminPage/UserPage';
import LoginPage from './pages/loginPage/LoginPage';
import Page404 from './pages/adminPage/Page404';
import ProductsPage from './pages/adminPage/ProductsPage';
import DashboardAppPage from './pages/adminPage/DashboardAppPage';
import StorePage from'./pages/adminPage/StorePage';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        {path: 'store', element: <StorePage /> },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
