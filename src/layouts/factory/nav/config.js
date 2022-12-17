// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/factory/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Nhập sản phẩm',
    path: '/factory/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Xuất sản phẩm',
    path: '/factory/export',
    icon: icon('ic_user'),
  },
  {
    title: 'Vận chuyển',
    path: '/factory/transport',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
