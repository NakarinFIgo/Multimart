import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const signin = async (data) => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      console.log(user);
      setLoading(false);
      toast.success('Successfully logged in');
      navigate('/checkout');
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      { 
        loading ? <div>Loading...</div> :
        (
          <div className='grid justify-items-center '>
            <div className='grid justify-items-center py-10'>
              <h3 className='font-bold text-2xl pb-[20px]'>Login</h3>
              <form onSubmit={handleSubmit(signin)} className='w-[350px] md:w-[600px] grid bg-[#091836] rounded-xl p-5'>
                <div className='grid gap-5 pt-5'>
                  <div className='grid '>
                    <input 
                      {...register('email', { 
                        required: 'Email is required', 
                        pattern: {
                          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: 'Invalid email address'
                        }
                      })} 
                      placeholder='Enter your Email' 
                      className='border-2 rounded px-2 py-1'
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                  </div>
                  <div className='grid'>
                    <input
                      type='password'
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                          message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                        }
                      })}
                      placeholder='Enter your Password'
                      className='border-2 rounded px-2 py-1'
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                  </div>
                </div>
                <button type="submit" className='mt-10 w-[100px] mx-auto px-4 py-2 bg-blue-500 text-white rounded'>
                  Login
                </button>
                <div className='flex justify-center'>
                  <p className='mt-4 text-white'>Don't have an account? <Link to='/signup' className='text-blue-500'>Create an account</Link></p>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Login;
