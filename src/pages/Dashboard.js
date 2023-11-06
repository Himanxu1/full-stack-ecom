import React, { useEffect, useState } from 'react'
import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar
} from "@material-tailwind/react";
import { TABLE_HEAD } from '../utils/constants';
const backend_url = process.env.REACT_APP_BACKEND_URI;

const Dashboard = () => {

  const [orderData,setOrderData] = useState([])
  const [totalOrder,setTotalOrder] = useState(0)
  const [totalAmount,setTotalAmount] = useState(0)

  const fetchOrderData = async () =>{
    const data = await fetch(`${backend_url}api/order/get-all`,{
      headers:{
        'Authorization':localStorage.getItem('token')
      }
  })
    const res = await data.json()
    setOrderData(res.orders)
    console.log(res.orders)
    const totalAmt = res.orders[0].products.reduce((curr,item)=>{
      return Number(item.price)+curr;
    },0)
    console.log(totalAmt)
    setTotalAmount(totalAmount)
    setTotalOrder(res.orders.length)
  }
  useEffect(()=>{
    fetchOrderData()
  },[])

console.log(orderData)
  return (
    <div>
           <div className='w-full h-[140px] bg-blue-600   ml-10 mt-10 border rounded-md' >
            <div className='ml-4 mt-4 text-white'>
               <h1 className='text-2xl font-semibold  '>Overview</h1>
               <p >How your shop is performing?</p>
            </div>
            <div className='ml-4 flex justify-between w-[600px]  mt-2'>
              <div>
              <p className='text-white font-bold'>Users</p>
              <p>200</p>
              </div>
              <div>
              <p className='text-white font-bold'>Orders</p>
              <p>{totalOrder}</p>
              </div>
              <div>
              <p className='text-white font-bold'>Earnings</p>
              <p>${totalAmount}</p>
              </div>
            </div>
           
           </div>

        <Card className=" w-full ml-10 mt-2">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
     
          <div className="w-full md:w-72">
            <Typography
               variant="lead"
               color="blue-gray"
               className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
            >
             All Orders
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden px-0">
        <table className="mt-4 w-[900px] min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orderData.map(
              ({ products }, index) => {
                const isLast = index === orderData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
    
               
                return (
                  <>
                    {
                      products.map((item)=>{
                        return (
                          <tr>
                    <td className={classes}>
                      <div className="flex">
                      <Avatar src={item.img} alt={item.name} size="sm" />
                      <div className='flex flex-col ml-2'>

                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.name}
                        </Typography>
                       
                      </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={item.quantity }
                          color={ "green" }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Date(item.createdAt)}
                      </Typography>
                    </td>
                    <td className={classes}>
                    
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        ${item.price}
                      </Typography>
                   
                    </td>
                          </tr>
                        )
                      })
                    }
                 
                  </>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Dashboard