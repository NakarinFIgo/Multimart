import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase.config';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';

function Signup() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data.username
      });

      // store user data in firestore database
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: data.username,
        email: data.email
      });

      setLoading(false);
      toast.success('Account created');
      navigate('/login');
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      <div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className='grid justify-items-center '>
              <div className='grid justify-items-center py-10'>
                <h3 className='font-bold text-2xl pb-[20px]'>SignUp</h3>
                <form onSubmit={handleSubmit(onSubmit)} className='w-[350px] md:w-[600px] grid bg-[#091836] rounded-xl p-5'>
                  <div className='grid gap-5 pt-5'>
                    <div className='grid'>
                      <input 
                        {...register('username', { 
                          required: 'Username is required', 
                          maxLength: {
                            value: 20, 
                            message: 'Username cannot exceed 20 characters' 
                          }
                        })} 
                        placeholder='Enter your username' 
                        className='border-2 rounded px-2 py-1'
                      />
                      {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                    </div>
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
                    <div className='grid'>
                      <input
                        type='password'
                        {...register('confirmPassword', {
                          required: 'Confirm Password is required',
                          validate: value => value === watch('password') || 'Passwords do not match'
                        })}
                        placeholder='Confirm your Password'
                        className='border-2 rounded px-2 py-1'
                      />
                      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
                  </div>
                  <button type="submit" className='mt-10 w-[200px] mx-auto px-4 py-2 bg-blue-500 text-white rounded'>
                    Create an account
                  </button>
                  <div className='flex justify-center'>
                    <p className='mt-4 text-white'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
