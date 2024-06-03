import React from 'react'
import useGetData from '../custom-hooks/useGetData'

function Dashboard() {
  const {data: products} = useGetData('products')
  const {data: users} = useGetData('users')
  return (
    <div>
      <div>
        <div>
          <h1>Total Sales</h1>
          <span>$2550</span>
        </div>
        <div>
          <h1>Orders</h1>
          <span>250</span>
        </div>
        <div>
          <h1>Total Products</h1>
          <span>{products.length}</span>
        </div>
        <div>
          <h1>Total Users</h1>
          <span>{users.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Dashboard