import React, { useRef, useState } from 'react';
import products from '../assets/data/products';
import CommonSection from '../components/UI/CommonSection';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductsList from '../components/UI/ProductsList';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

function ProductDetail() {
  const [tab, setTap] = useState('desc');
  const reviewUser = useRef('');
  const reviewMsg = useRef('');
  const { id } = useParams();
  const [rating, setRating] = useState(null);
  const product = products.find(item => item.id === id);
  const dispatch = useDispatch();

  if (!product) {
    return <div>Product not found!</div>;
  }

  const { 
    imgUrl, 
    productName,
    price, 
    avgRating, 
    shortDesc, 
    reviews, 
    description,
    category 
  } = product;

  const relatedProducts = products.filter(item => item.category === category);

  const submitHandle = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    // Add logic to handle the review submission
    console.log({
      reviewUserName,
      reviewUserMsg,
      rating
    });

    // Reset form fields
    reviewUser.current.value = '';
    reviewMsg.current.value = '';
    setRating(null);

    toast.success('Review success')
  };

  const addToCart = () => {
    dispatch(addItem({
      id,
      image: imgUrl,
      productName,
      price,
    }));

    toast.success('Product added successfully');
  };

  return (
    <div>
      <CommonSection title={productName} />
      <div className='flex justify-center'>
        <div className='grid md:flex md:w-[1200px] px-auto'>
          <div className='w-full xl:w-[800px]'>
            <img src={imgUrl} alt={productName} />
          </div>
          <div className='mx-3 w-full'>
            <div className='flex flex-col px-auto pt-2 gap-1 relative lg:pt-10 lg:h-[400px] xl:w-[600px] xl:pt-20 h-[350px]'>
              <h2 className='font-md text-4xl'>{productName}</h2>
              <div className='flex'>
                <div className='flex text-[#FAAB37]'>
                  {[...Array(5)].map((_, index) => (
                    <span key={index} onClick={() => setRating(index + 1)}>
                      <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17Z"></path>
                      </svg>
                    </span>
                  ))}
                </div>
                <div>
                  <p className='opacity-80 ml-10 pt-[-1px] text-[#EE991C]'>({avgRating} rating)</p>
                </div>
              </div>
              <span className='font-md text-xl'>${price}</span>
              <p className='flex-wrap w-full'>{shortDesc}</p>
              <motion.button whileTap={{ scale: 1.1 }} onClick={addToCart} className='left-[-5px] bottom-[100px] absolute mt-5 border w-[120px] text-white h-10 rounded-md bg-[#249B7B]'>Add to Cart</motion.button>
            </div>
          </div>
        </div>
      </div>
      <div className='grid gap-3 pt-5 xl:px-40'>
        <div className='flex gap-5 px-5'>
          <h1 className={`${tab === 'desc' ? 'font-bold' : ''}`} onClick={() => setTap('desc')}>Description</h1>
          <h1 className={`${tab === 'rev' ? 'font-bold' : ''}`} onClick={() => setTap('rev')}>Review ({reviews.length})</h1>
        </div>
        <div>
          {tab === 'desc' ? 
            <div>
              <p className='pl-5 pt-5 text-wrap'>{description}</p>
            </div> :
            <div>
              <div>
                <ul className='pl-5 pt-5'>
                  {reviews?.map((item, index) => (
                    <li key={index}>
                      <span className='text-[#EE991C] font-bold'>{item.rating} (rating)</span>
                      <p className='text-balance'>{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <form className='mt-5 pl-5 mx-auto w-[350px] md:w-[600px] lg:w-[1000px] 2xl:w-[1000px]' onSubmit={submitHandle}>
                <h1 className='py-5 font-bold'>Leave Your Experience</h1>
                <div>
                  <input ref={reviewUser} className='w-full h-[32px] border-2 rounded-md px-5' type="text" placeholder='Enter name' />
                </div>
                <div className='w-[250px] text-[#FAAB37] flex py-5 gap-1'>
                  {[...Array(5)].map((_, index) => (
                    <>
                      <span key={index} onClick={() => setRating(index + 1)} className={rating === index + 1 ? 'text-yellow-500' : ''}>
                        {index + 1}
                      </span>
                      <motion.svg whileTap={{scale:1.1}} className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17Z"></path></motion.svg>
                    </>
                  ))}
                </div>
                <div>
                  <textarea ref={reviewMsg} className='w-full h-[100px] border-2 rounded-md px-5' placeholder='Review Message ...' />
                </div>
                <motion.button whileTap={{ scale: 1.2 }} className='my-[40px] py-1 bg-black text-white rounded-md w-20' type='submit'>Submit</motion.button>
              </form>
            </div>
          }
        </div>
        <div>
          <h1 className='text-center font-bold text-xl my-5'>You might also like</h1>
        </div>
      </div>
      <div>
        <ProductsList data={relatedProducts} />
      </div>
    </div>
  );
}

export default ProductDetail;
