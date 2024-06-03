import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

function ProductsCard({items}) {
    const dispatch = useDispatch()
    const addToCart = (items)=>{
        dispatch(addItem({
            id: items.id,
            productName: items.productName,
            price: items.price,
            imgUrl:items.imgUrl
        }))
        toast.success('Product Added success')
    }
  return (
    <>
        <div>
            <div key={items.id} className='cursor-pointer grid justify-items-center'>
                <div className='w-[300px]'>
                    <Link to={`/shop/${items.id}`}>
                        <div className='my-5'>
                        <motion.img whileHover={{ scale: 0.9 }} className='w-[300px]' src={items.imgUrl} alt="product1" />
                        </div>
                        <h3 className='font-bold text-xl'>  
                            <div>{items.productName}</div>
                        </h3>
                    </Link>
                    <span>{items.category}</span>
                    <div className='flex justify-between'>
                        <span>${items.price}</span>
                        <span>
                            <motion.svg whileTap={{ scale: 1.2 }} onClick={()=>addToCart(items)} className='w-[20px] bg-black text-white rounded-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                            </motion.svg>
                        </span>
                    </div> 
                </div>    
            </div>
        </div>
    </>
  );
}

export default ProductsCard;
