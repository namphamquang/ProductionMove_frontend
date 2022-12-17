// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/agency/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Quản lý sản phẩm',
    path: '/agency/product',
    icon: icon('ic_user'),
  },
  {
    title: 'Bán sản phẩm',
    path: '/agency/sell',
    icon: icon('ic_user'),
  },
  {
    title: 'Nhập sản phẩm',
    path: '/agency/import',
    icon: icon('ic_lock'),
  }, {
    title: 'Quản lý đơn hàng',
    path: '/agency/bill',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
