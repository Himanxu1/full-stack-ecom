import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AiFillDelete } from 'react-icons/ai'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { UpdatedProductContext } from '../context';
import showToast from '../utils/toast/showToast';


const ProductCard = (singleProduct) => {
    const backend_url = process.env.REACT_APP_BACKEND_URI;
    const {updatedData, setUpdatedData} = useContext(UpdatedProductContext)
   
    const {productid,name,img,price}= singleProduct.singleProduct
  

    const handleProductDelete = async (id) =>{
      const data = await fetch(`${backend_url}api/products?id=${id}`,  
      {
        method: 'DELETE',
        headers:{
          'Authorization':localStorage.getItem('token')
        }})
        setUpdatedData(!updatedData)
    showToast('🦄 Product deleted!')
      
    }
  
  return (

    <Link > 
  
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />


    <Card className="w-64 m-4">
      <CardHeader shadow={false} floated={false} className="h-52">
        <img
          src={img}
          alt="card"
          className="w-[250px] h-[200px] object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className=" flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ${price}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <div className='flex'>
        <Link  to={`/products/${productid}` }>  
        <p
          className=" text-xl px-4 mt-2 bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
        Edit 
        </p>
        </Link>
         <Button className='text-white text-xl ml-2  hover:text-red-500' onClick={()=>handleProductDelete(productid)}><AiFillDelete/></Button> 
        </div>
      </CardFooter>
    </Card>
  

    {/* <div  className={'border border-white w-[270px] h-[300px] p-6 m-8 shadow-lg shadow-cyan-500' } >
        <img src={img} className='w-[250px] h-[200px]' alt="phot" />
        <div className='flex justify-between items-center'>
        <p className='text-white text-2xl font-semibold mt-2 font-mono'>{name}</p>
        <p className='text-white text-2xl font-semibold mt-2 font-mono'>${price}</p>
      
        </div>
        
    </div> */}
    </Link>
  )
}

export default ProductCard
