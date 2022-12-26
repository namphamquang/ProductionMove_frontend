import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import AdminLayout from '../layouts/admin';
import SimpleLayout from '../layouts/simple';

// ----------------------------------------------------------------------

import UserPage from '../pages/adminPage/UserPage';
import LoginPage from '../pages/loginPage/LoginPage';
import Page404 from '../pages/Page404';
import ProductsPage from '../pages/adminPage/ProductsPage';
import DashboardAppPage from '../pages/adminPage/DashboardAppPage';
import StorePage from'../pages/adminPage/StorePage';

export default function AdminRouter() {
  const routes = useRoutes([
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { element: <Navigate to="/admin/dashboard" />, index: true },
        { path: 'dashboard', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
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
        { element: <Navigate to="/admin/dashboard" />, index: true },
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
