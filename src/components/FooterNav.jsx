import { Link, useLocation } from 'react-router-dom';
import { 
  HiHome, 
  HiShoppingBag, 
  HiHeart, 
  HiUser, 
  HiSearch 
} from 'react-icons/hi';

const FooterNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      icon: HiHome,
      label: 'Home',
      path: '/',
      active: isActive('/')
    },
    {
      icon: HiSearch,
      label: 'Search',
      path: '/search',
      active: isActive('/search')
    },
    {
      icon: HiShoppingBag,
      label: 'Order',
      path: '/order',
      active: isActive('/cart')
    },
    {
      icon: HiHeart,
      label: 'Wishlist',
      path: '/wishlist',
      active: isActive('/wishlist')
    },
    {
      icon: HiUser,
      label: 'Profile',
      path: '/profile',
      active: isActive('/profile')
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center justify-center w-16 ${
                item.active ? 'text-[#0289de]' : 'text-gray-600'
              }`}
            >
              <IconComponent className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FooterNav;