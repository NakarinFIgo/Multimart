import React from 'react'
import ProductsCard from './ProductsCard'
function ProductsList({data}) {
  return (
    <div className='w-full mx-auto'>
        <div className='grid md:grid-cols-2 xl:grid-cols-4'>
        {
            data.map((items,index)=>(
                <ProductsCard items={items} key={index}/>
            ))
        }
        </div>
    </div>
  )
}

export default ProductsList