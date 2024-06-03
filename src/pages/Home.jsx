import React, { useEffect, useState } from 'react'
import heroImg from '../assets/images/hero-img.png'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Services from '../services/Services'
import ProductsList from '../components/UI/ProductsList'
import countImg from '../assets/images/counter-timer-img.png'
import Clock from '../components/UI/Clock'
import useGetData from '../custom-hooks/useGetData'
import products from '../assets/data/products'

function Home() {
  //const {data:products,loading} = useGetData('products')
  const [trendProduct, setTrendProducts] = useState([])
  const [bestSalesProducts, setBestSalesProducts]= useState([])
  const [mobileProducts, setMobileProducts]= useState([])
  const [wirelessProducts, setWirelessProducts]= useState([])
  const [popularProducts, setPopularProducts]= useState([])
  
  const year = new Date().getFullYear()

  useEffect(()=>{
    const filterTrendProducts = products.filter(item => item.category === "chair")
    setTrendProducts(filterTrendProducts)

    const filterBestSales = products.filter(item => item.category === "sofa")
    setBestSalesProducts(filterBestSales)

    const filterMobile = products.filter(item => item.category === "mobile")
    setMobileProducts(filterMobile)

    const filterWireless = products.filter(item => item.category === "wireless")
    setWirelessProducts(filterWireless)  
    
    const filterPopular = products.filter(item => item.category === "watch")
    setPopularProducts(filterPopular)  
  },[products])

  return (
    <div>
      <div>
        <div>
          <div className='bg-[#D1FBF0] h-[450px] pt-2 w-full md:h-[300px]'>
            <div className='grid justify-center gap-8 md:flex md:gap-2'>
              <div className='relative pl-4'>
                <p className='text-sm opacity-50 md:text-md'>Trending product in {year}</p>
                <h1 className='font-bold text-2xl mb-2 w-[300px] md:text-3xl md:w-[400px]'>Make Your Interior More Minimalistic & Modern</h1>
                <p className='w-[300px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Sed soluta earum tempore perspiciatis non illum ab quam illo temporibus magnam.</p>
                <motion.button whileTap={{scale:1.1}} className='border-solid bg-[#0C5A6C] text-white w-[100px] h-[30px] rounded-md  mt-4 absolute left-[-1px] ml-4'>
                  <Link to='shop'>
                    <span className='text-sm py-1'>SHOP NOW</span>
                  </Link> 
                </motion.button>
              </div>
              <div className='flex justify-center'>
                <img className='w-[300px] md:w-[500px] md:pr-[5px] lg:w-[400px]' src={heroImg} alt="hero-img" />
              </div>
            </div>
          </div>
          <Services/>
        </div>
        <div className='flex justify-center mt-10'>
          <h1 className='font-bold text-2xl'>Trending Product</h1>
        </div>
        {
          //loading ? <h5>Loading</h5>:
          <ProductsList data={trendProduct}/> 
        }
        <div className='flex justify-center mt-20'>
          <h1 className='font-bold text-2xl'>Best Sales</h1>
        </div>
        {
          //loading ? <h5>Loading</h5>:
          <ProductsList data={bestSalesProducts}/>
        }
      </div>
      <div className='bg-[#246F55] grid mt-20 py-5 md:grid-cols-2 xl:px-40 2xl:px-[500px]'>
        <div className='text-white font-bold w-[300px]'>
          <div className='text-sm pl-10'>
            Limited Offers
          </div>
          <div className='text-xl pl-10'>
            Quality Armchair
          </div>
          <Clock/>
          <div className='flex w-full '>
            <motion.button whileTap={{scale:1.1}} className=' mt-6 w-[150px] h-10 rounded-md bg-black hover:bg-[#ABF9DF] hover:text-black ml-36 md:ml-28'>Visit Store</motion.button>
          </div>
        </div>
        <div>
          <img className='pr-[40px] w-100' src={countImg} alt="countImg" />
        </div>
      </div>
      <div className='pt-10'>
        <h1 className='text-2xl text-center font-bold'>New Arival</h1>
        <div>
          {
            //loading ? <h5>Loading</h5>:
            <ProductsList data = {mobileProducts}/>
          }
        </div>
        <div>
          {
             //loading ? <h5>Loading</h5>:
            <ProductsList data = {wirelessProducts}/>
          }
        </div>
        <div>
          <h2 className='text-4xl text-center font-bold pt-20 pb-10'>Popular in Category</h2>
          {
             //loading ? <h5>Loading</h5>:
             <ProductsList data = {popularProducts}/>
          }
        </div>
      </div>
    </div>
  )
}

export default Home