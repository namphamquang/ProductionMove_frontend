// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/agency/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Quản lý sản phẩm',
    path: '/agency/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Xuất sản phẩm',
    path: '/agency/export',
    icon: icon('ic_user'),
  },
  {
    title: 'Nhập sản phẩm',
    path: '/agency/import',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
