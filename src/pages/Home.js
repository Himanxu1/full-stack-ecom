import React, { useEffect, useState } from 'react'
import useProducts from '../utils/useProducts'
import ProductCard from '../components/ProductCard'

const Home = () => {

    const [filteredProducts,setFilteredProducts] = useState([])
    const [searchItem,setSearchItem] = useState("")
     const products = useProducts(setFilteredProducts)

     const filterData = (products,searchItem)=>{
        const list = products.filter((product) => product.name.toLowerCase().includes(searchItem.toLowerCase()))
  
        setFilteredProducts(list)
    }
  
    useEffect(()=>{
      filterData(products,searchItem)
   },[searchItem])

  return (
    <div className='w-full'>
        <div className='bg-black w-full'>
      <div className='flex justify-center'>
       <input  className='px-14  mt-10 py-2 border border-white bg-black text-white' placeholder='Search Headphone' 
        onChange={(e)=>setSearchItem(e.target.value)}
        />
      </div>
        <h1 className='text-end text-[20px] mr-10 font-bold text-white'>/all-Products</h1>
         <div className='flex flex-wrap justify-center mt-20'>
      { filteredProducts.length === 0 ? <div className='text-center font-mono text-3xl text-white'>loading👀...</div>: filteredProducts.map((singleProduct,index)=>{
            return (
              <>
               <ProductCard key={singleProduct.id} singleProduct={singleProduct} wish={false} />
              </>
            )
          })} 
    
         </div>
    </div>
    </div>
  )
}

export default Home