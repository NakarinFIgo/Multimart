import React from 'react';
import useGetData from '../custom-hooks/useGetData';

function Dashboard() {
  const { data: products } = useGetData('products');
  const { data: users } = useGetData('users');

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold text-gray-700">Total Sales</h1>
          <span className="block text-2xl font-bold text-gray-900">$2550</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold text-gray-700">Orders</h1>
          <span className="block text-2xl font-bold text-gray-900">250</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold text-gray-700">Total Products</h1>
          <span className="block text-2xl font-bold text-gray-900">{products.length}</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold text-gray-700">Total Users</h1>
          <span className="block text-2xl font-bold text-gray-900">{users.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
