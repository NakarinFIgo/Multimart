import React from 'react';
import CommonSection from '../components/UI/CommonSection';
import { motion } from 'framer-motion';
import { deleteItem } from '../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  return (
    <div>
      <CommonSection />
      <div className='flex flex-wrap lg:gap-40'>
        <div className='pl-2 md:pl-5 xl:pl-24'>
          {cartItems.length === 0 ? (
            'No item added to cart'
          ) : (
            <table className='table-fixed w-[400px] md:w-[700px] xl:w-[900px]'>
              <thead className='border-b-2'>
                <tr className='mx-auto h-[100px]'>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <Tr item={item} key={index} />
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className='py-2 px-5'>
          <div className='mt-4'>
            <h2 className='text-xl font-bold'>Subtotal</h2>
            <span className='text-lg font-semibold text-[#0A975D]'>${totalAmount}</span>
          </div>
          <p className='mt-2 text-sm'>Taxes and shipping will be calculated at checkout.</p>
          <div className='mt-4'>
            <button className='mr-4 px-4 py-2 bg-blue-500 text-white rounded'>
              <Link to='/shop'>Continue Shopping</Link>
            </button>
            <button className='px-4 py-2 bg-green-500 text-white rounded'>
              <Link to='/checkout'>Checkout</Link>
            </button>
          </div>
        </div> 
      </div>  
    </div>
  );
}

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(deleteItem(item.id));
  };

  return (
    <tr className='text-center border-b-2'>
      <td className='flex justify-center'>
        <img
          className='w-[100px] h-[90px] xl:w-[200px] xl:h-[200px]'
          src={item.imgUrl}
          alt={item.productName}
        />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity} pcs</td>
      <td className='relative' onClick={deleteProduct}>
        <motion.svg
          whileTap={{ scale: 1.2 }}
          className='w-5 cursor-pointer absolute bottom-[35px] left-[30px] md:left-[60px] xl:left-[80px] xl:bottom-[90px]'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z'></path>
        </motion.svg>
      </td>
    </tr>
  );
};

export default Cart;
