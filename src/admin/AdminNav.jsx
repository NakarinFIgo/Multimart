import React from 'react';
import { NavLink } from 'react-router-dom';

const admin_nav = [
  {
    display: 'Dashboard',
    path: '/dashboard',
  },
  {
    display: 'All-Products',
    path: '/dashboard/all-products',
  },
  {
    display: 'Orders',
    path: '/dashboard/orders',
  },
  {
    display: 'User',
    path: '/dashboard/users',
  },
];

function AdminNav() {
  return (
    <div className="bg-gray-900 text-white py-4">
      <div className="max-w-screen-lg mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-semibold text-lg">Multimart</span>
          <div className="ml-4">
            <input
              type="text"
              placeholder="Search...."
              className="bg-gray-800 text-white px-4 py-2 rounded-md w-[800px]"
            />
            <button className="bg-gray-800 text-white px-4 py-2 ml-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M19 18.682V11.003c0-3.86-3.141-7.001-7-7.001s-7 3.141-7 7.001c0 3.86 3.141 7.001 7 7.001 1.499 0 2.878-.589 3.923-1.659L19 18.682zm-1-8.679V18.66L15.498 15.16c-1.253 1.153-3.024 1.825-4.998 1.825-3.314 0-6-2.686-6-5.999s2.686-6 6-6 6 2.686 6 6c0 1.973-.672 3.745-1.822 5.005L18 10.003zm-2.498-3.99c2.481 0 4.5-2.019 4.5-4.5s-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5 2.019 4.5 4.5 4.5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto px-4">
        <ul className="flex justify-center space-x-4 mt-4">
          {admin_nav.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className="hover:bg-gray-800 px-3 py-2 rounded-md transition duration-300"
                activeClassName="bg-gray-800"
              >
                {item.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminNav;
