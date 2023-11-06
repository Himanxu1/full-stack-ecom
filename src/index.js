import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateProduct from './pages/CreateProduct';
import { ThemeProvider } from "@material-tailwind/react";
import EditProduct from './pages/EditProduct';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { UpdatedProductProvider } from './context';


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Login/>,
   
  },
  {
    path:'/',
    element:<App/>,
    children:[
      {
       path:'/home',
       element:<Home/>
      },
      {
        path:'/create',
        element:<CreateProduct/>
       },
       {
        path:'/products/:productId',
        element:<EditProduct/>
       },
       {
        path:'/profile',
        element:<Profile/>
       },
       {
        path:'/dashboard',
        element:<Dashboard/>
       }
    ]
  }
 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <UpdatedProductProvider>
      <RouterProvider router={appRouter} />
      </UpdatedProductProvider>
    </ThemeProvider>
  </React.StrictMode>
);

