import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const navLink = [
  {
    path:'home',
    display:'Home'
  },
  {
    path:'shop',
    display:'Shop'
  },
  {
    path:'cart',
    display:'Cart'
  }
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const navigateToCart = () => {
    navigate('/cart');
  };

  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // เพิ่มฟังก์ชันเพื่อปิดเมนูเมื่อขนาดหน้าจออยู่ในโหมด responsive md
  const closeMenu = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  const logout = () => {
    signOut(auth).then(()=>{
      navigate('/home')
      toast.success('Logged out')
    }).catch(err=>{
      toast.error(err.message)
    })
  }

  return (
    <div className={`sticky top-0 z-50 ${isScrolled ? 'bg-white shadow-md' : ''}`}>
      <div className='container mx-auto '>
        <div className='flex justify-around items-center py-8'>
          <div className='logo flex gap-5'>  
            <img className='w-6 h-6' src={logo} alt="logo" />  
            <div>
              <h1 className='font-bold text-xl'>Multimart</h1>
            </div>
          </div>
          <div className='icon flex gap-3 relative'>
            {isMenuOpen ? (
              <ul className='flex flex-col gap-5 absolute top-5 right-[-190px] bg-white shadow-md z-50 p-4 rounded-md' onClick={closeMenu}>
                {navLink.map((items, index) => (
                  <li key={index}>
                    <NavLink to={items.path} className='focus:font-bold'>{items.display}</NavLink>
                  </li>
                ))}
              </ul>
            ) : null }
            <ul className='hidden md:flex md:w-[300px] md:justify-around md:py-1 '>
                  {navLink.map((items, index) => (
                    <li key={index}>
                      <NavLink to={items.path} className='focus:font-bold'>{items.display}</NavLink>
                    </li>
                  ))}
            </ul>
          </div>
          <div>
            <div className='icon flex gap-3'>
              <span className='fav-icon relative'>
                <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path></svg>
                <span className='absolute top-[-4px] right-[-7px] text-center bg-black w-[15px] h-[15px] text-xs text-white rounded-full'>1</span>
              </span>
              <span onClick={navigateToCart} className='cart-icon relative cursor-pointer'>
                <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.00488 7.99966V5.99966C7.00488 3.23824 9.24346 0.999664 12.0049 0.999664C14.7663 0.999664 17.0049 3.23824 17.0049 5.99966V7.99966H20.0049C20.5572 7.99966 21.0049 8.44738 21.0049 8.99966V20.9997C21.0049 21.5519 20.5572 21.9997 20.0049 21.9997H4.00488C3.4526 21.9997 3.00488 21.5519 3.00488 20.9997V8.99966C3.00488 8.44738 3.4526 7.99966 4.00488 7.99966H7.00488ZM7.00488 9.99966H5.00488V19.9997H19.0049V9.99966H17.0049V11.9997H15.0049V9.99966H9.00488V11.9997H7.00488V9.99966ZM9.00488 7.99966H15.0049V5.99966C15.0049 4.34281 13.6617 2.99966 12.0049 2.99966C10.348 2.99966 9.00488 4.34281 9.00488 5.99966V7.99966Z"></path>
                </svg>
                <span className='absolute top-[-4px] right-[-6px] text-center bg-black w-[15px] h-[15px] text-xs text-white rounded-full'>{totalQuantity}</span>
              </span>
              <span className='relative'>
                <motion.img whileTap={{scale: 1.2}} className='w-8 h-8 cursor-pointer' src={userIcon} alt="user_icon" onClick={toggleProfileMenu} />
                {isProfileMenuOpen && (
                  <div className='absolute right-0 mt-2 py-2 w-48 bg-white border rounded-lg shadow-xl'>
                    {currentUser ? (
                      <span className='block px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200' onClick={logout} na>Logout</span>
                    ) : (
                      <div>
                        <Link to='/signup' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Signup</Link>
                        <Link to='/login' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Login</Link>
                        <Link to='/dashboard' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Dashboard</Link>
                      </div>
                    )}
                  </div>
                )}
              </span>
              <span onClick={toggleMenu} className='md:hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
                  <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`z-40 ${isScrolled ? 'bg-white shadow-md' : ''} transition-colors duration-300`} />
    </div>
  );
}

export default Header;
