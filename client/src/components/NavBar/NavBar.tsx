import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/pictures/web-dev-icon.svg';
import { menuOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton/LoginButton';
import UserAvatar from '../UserAvatar/UserAvatar';


const Navbar: React.FC = () => {

  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <nav className='bg-gray-800 py-6 relative'>
      <div className='container mx-auto flex px-8 xl:px-0'>
        <div className='flex flex-grow items-center'>
          <NavLink to='/' className='flex flex-grow items-center'>
            <img src={logo} alt="logo" />
            <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 px-2">FromZeroToDev</h1>
          </NavLink>
        </div>
        <div className='flex lg:hidden'>
          <IonIcon  icon={menuOutline} size="large" className="icon-class text-blue-500 hover:text-blue-600" onClick={(e) => openMenu()} />
        </div>
        <div id='menu' className='lg:flex hidden flex-grow justify-between absolute lg:relative lg:top-0 top-20 left-0 bg-gray-800 w-full lg:w-auto items-center py-14 lg:py-0 px-8 sm:px-24 lg:px-0'>
          <div className='flex flex-col lg:flex-row mb-8 lg:mb-0'>
            <NavLink to='/home' className='text-white lg:mr-7 mb-8 lg:mb-0'>
            Home
            </NavLink>
            <NavLink to='/courses' className='text-white lg:mr-7 mb-8 lg:mb-0' >
            Courses
            </NavLink>
            <NavLink to= "/create" className='text-white mb-8 lg:mb-0'>
            Create
            </NavLink>
            
          </div>
          <div className='flex flex-col lg:flex-row items-center'>
          { isAuthenticated ? <UserAvatar /> : <LoginButton />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

function openMenu() {
  let menu = document.getElementById('menu');
  if(menu?.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu?.classList.add('hidden');
  }
}

