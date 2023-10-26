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
       }
    ]
  }
 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  </React.StrictMode>
);

