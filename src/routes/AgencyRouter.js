import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import AgencyLayout from '../layouts/agency';
import SimpleLayout from '../layouts/simple';

// ----------------------------------------------------------------------

import ProductPage from '../pages/agencyPage/ProductPage';
import LoginPage from '../pages/loginPage/LoginPage';
import Page404 from '../pages/agencyPage/Page404';
import ExportPage from '../pages/agencyPage/ExportPage';
import DashboardAppPage from '../pages/agencyPage/DashboardAppPage';
import ImportPage from '../pages/agencyPage/ImportPage';

export default function AgencyRouter() {
  const routes = useRoutes([
    {
      path: '/agency',
      element: <AgencyLayout />,
      children: [
        { element: <Navigate to="/agency/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <ProductPage /> },
        { path: 'export', element: <ExportPage /> },
        {path: 'import', element: <ImportPage/>}


      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/agency/app" />, index: true },
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
