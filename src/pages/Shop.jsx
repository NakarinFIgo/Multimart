import React, { useState } from 'react'
import CommonSection from '../components/UI/CommonSection'
import products from '../assets/data/products'
import ProductsList from '../components/UI/ProductsList'

function Shop() {
  const [productsData, setProductsData] = useState(products)

  const handleFilter = (e) => {
    const filterValue = e.target.value
      if (filterValue === 'sofa') {
        const filteredProducts = products.filter(
          (item) => item.category === 'sofa'
        )
        setProductsData(filteredProducts)
      }else if (filterValue === 'mobile') {
        if (filterValue === 'mobile') {
          const filteredProducts = products.filter(
            (item) => item.category === 'mobile'
          )
          setProductsData(filteredProducts)
        }
      }else if (filterValue === 'chair') {
        if (filterValue === 'chair') {
          const filteredProducts = products.filter(
            (item) => item.category === 'chair'
          )
          setProductsData(filteredProducts)
        }
      }else if (filterValue === 'watch') {
        if (filterValue === 'watch') {
          const filteredProducts = products.filter(
            (item) => item.category === 'watch'
          )
          setProductsData(filteredProducts)
        }
      }else if (filterValue === 'wireless') {
        if (filterValue === 'wireless') {
          const filteredProducts = products.filter(
            (item) => item.category === 'wireless'
          )
          setProductsData(filteredProducts)
        }
      }else{
        setProductsData(products)
      }
    }
  const handleSort = (e) => {
    const sortItem = e.target.value;
    let sortedProducts = [];
    if (sortItem === 'ascending') {
      sortedProducts = [...productsData].sort((a, b) => a.price - b.price);
    }else if (sortItem === 'descending') {
      sortedProducts = [...productsData].sort((a, b) => b.price - a.price);
    }else{
      return null
    }
    setProductsData(sortedProducts);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value
    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    setProductsData(searchedProducts)
  }
  return (
    <div>
      <div>
        <CommonSection title='Product'/>
      </div>
      <div className='flex justify-around lg:px-20 xl:px-[80px] 2xl:px-40 pt-10'>
        <div>
          <select onChange={handleFilter} className='border bg-[#005136] text-white rounded-md text-xs lg:w-[150px] xl:w-[200px] h-[30px] px-2'>
            <option value="catagory">Filter By Category</option>
            <option value="sofa">Sofa</option>
            <option value="mobile">Mobile</option>
            <option value="chair">Chair</option>
            <option value="watch">Watch</option>
            <option value="wireless">Wireless</option>
          </select>
        </div>
        <div>
          <select onChange={handleSort} className='border bg-[#005136] text-white rounded-md text-xs lg:w-[100px] xl:w-[200px] h-[30px] px-2'>
            <option>Sort By </option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        <div className='flex'>
          <div className='relative border-2 rounded-md'>
            <input onChange={handleSearch} className='w-[120px] md:w-[400px] lg:w-[500px] h-[30px] text-sm pl-2' type="text" placeholder='Search.'/>
            <span>
              <svg className='absolute right-0 top-0 w-[15px] py-2 mx-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
            </span>
          </div>
        </div>
      </div>
      <div>
          <div className='mt-10'>
            { 
              productsData.length === 0 ? <h1 className='text-center mt-10 font-bold text-2xl'>No products are found!</h1>
              : <ProductsList data={productsData}/>
            }
          </div>
        </div>
    </div>
  )
}

export default Shop