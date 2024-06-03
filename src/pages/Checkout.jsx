import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import CommonSection from '../components/UI/CommonSection';
import { useSelector } from 'react-redux';

function Checkout() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const onSubmit = data => {
    console.log(data);
    toast.success('Submit Success');
    reset(); // Reset the form after successful submission
  };

  useEffect(()=>{console.log(errors)

  },[errors])
  return (
    <div className="p-4 ">
      <CommonSection />
      <div>
        <div className='grid lg:grid-cols-2 justify-items-center mx-auto'>
          <form className='w-[300px] md:w-[500px] xl:w-[600px] mt-10 flex flex-col justify-center gap-4' onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold mb-4 flex justify-center">Billing Information</h1>
            <div className='grid'>
              <input 
                {...register('name', { 
                  required: 'Name is required', 
                  maxLength: {
                    value: 20, 
                    message: 'Name cannot exceed 20 characters' 
                  }
                })} 
                placeholder='Enter your name' 
                className='border-2 rounded px-2 py-1'
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div className='grid'>
              <input 
                {...register('email', { 
                  required: 'Email is required', 
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Invalid email address'
                  }
                })} 
                placeholder='Enter your email' 
                className='border-2 rounded px-2 py-1'
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div className='grid'>
              <input 
                {...register('phone', { 
                  required: 'Phone number is required', 
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Phone number must be a number'
                  }
                })} 
                placeholder='Phone number' 
                className='border-2 rounded px-2 py-1'
              />
              {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
            </div>

            <div className='grid'> 
              <input 
                {...register('street', { required: 'Street address is required' })} 
                placeholder='Street address' 
                className='border-2 rounded px-2 py-1'
              />
              {errors.street && <span className="text-red-500">{errors.street.message}</span>}
            </div>

            <div className='grid'>
              <input 
                {...register('city', { required: 'City is required' })} 
                placeholder='City' 
                className='border-2 rounded px-2 py-1'
              />
              {errors.city && <span className="text-red-500">{errors.city.message}</span>}
            </div>

            <div className='grid'>
              <input 
                {...register('postalCode', { required: 'Postal code is required' })} 
                placeholder='Postal code' 
                className='border-2 rounded px-2 py-1'
              />
              {errors.postalCode && <span className="text-red-500">{errors.postalCode.message}</span>}
            </div>

            <div className='grid'>
              <input 
                {...register('country', { required: 'Country is required' })} 
                placeholder='Country' 
                className='border-2 rounded px-2 py-1'
              />
              {errors.country && <span className="text-red-500">{errors.country.message}</span>}
            </div>

            <div className='grid'>
              <input
                {...register('creditCardNumber', {
                  required: 'Credit card number is required',
                  pattern: {
                    value: /^\d{16}$/,
                    message: 'Credit card number must be 16 digits'
                  }
                })}
                placeholder='Credit Card number'
                className='border-2 rounded px-2 py-1'
              />
              {errors.creditCardNumber && <p className="text-red-500">{errors.creditCardNumber.message}</p>}
            </div>

            <div className='grid'>
              <input
                {...register('expirationDate', {
                  required: 'Expiration date is required',
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
                    message: 'Expiration date must be in MM/YY format'
                  }
                })}
                placeholder='Expiration date'
                className='border-2 rounded px-2 py-1'
              />
              {errors.expirationDate && <p className="text-red-500">{errors.expirationDate.message}</p>}
            </div>

            <div className='grid'>
              <input
                {...register('cvv', {
                  required: 'CVV is required',
                  pattern: {
                    value: /^\d{3,4}$/,
                    message: 'CVV must be 3 or 4 digits'
                  }
                })}
                placeholder='CVV'
                className='border-2 rounded px-2 py-1'
              />
              {errors.cvv && <p className="text-red-500">{errors.cvv.message}</p>}
            </div>

            <div>
              <motion.input whileTap={{ scale: 1.2 }} type="submit" value="Submit" className="flex justify-center mx-auto bg-blue-900 text-white rounded px-4 py-2" />
            </div>
          </form>

          <div className='grid w-[400px] my-5 rounded-xl h-[400px] bg-blue-900 xl:justify-self-center lg:justify-self-end pt-10 mt-20 font-bold text-white'>
            <div className='p-5 grid rounded-xl'>
              <h6 className='flex justify-between'>
                Total Qty : <span>{totalQty} items</span>
              </h6>
              <h6 className='flex justify-between'>
                Subtotal : <span>${totalAmount}</span>
              </h6>
              <h6 className='flex justify-between'>
                <span>
                  Shipping : <br />
                  Free shipping
                </span>
                <span>$0</span>
              </h6>
              <h1 className='text-2xl flex justify-between'>
                Total Cost : <span>${totalAmount}</span>
              </h1>
            </div>
            <div className='flex justify-center'>
              <motion.button whileTap={{ scale: 1.2 }} className='bg-white text-black w-60 h-10 rounded-full'>Place an order</motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
