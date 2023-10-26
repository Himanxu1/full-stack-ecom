import { useState,useEffect } from "react"

const useProducts = (setFilteredProducts) =>{
    const [products,setProducts] = useState([])
    const backend_url = process.env.REACT_APP_BACKEND_URI;

    const fetchProducts = async () =>{
      const data = await fetch(`${backend_url}api/products/get-all`,{
        headers:{
          'x-auth-token':localStorage.getItem('token')
        }
    })
      const res = await data.json()
      setProducts(res.products)
      setFilteredProducts(res.products)
    }
    useEffect(()=>{
      fetchProducts()
    },[])
    return products
}

export default useProducts