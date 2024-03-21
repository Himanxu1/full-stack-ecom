import React from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {useFormik} from 'formik';
import { loginSchema } from "../validation/UserValidation";
import showToast from  '../utils/toast/showToast'

const initialValues ={ 
  email:"",
  password:""
}

const backend_url = process.env.REACT_APP_BACKEND_URI;
const Login = () => {
  const navigate = useNavigate();

  const {values,handleChange,errors,handleSubmit,touched,handleBlur} = useFormik({
    initialValues:initialValues,
    validationSchema:loginSchema,
    onSubmit:(values)=>{
     console.log(values)
     const data = values;
     axios.post(`${backend_url}api/auth/login`,data )
     .then((res) => {
     showToast('🦄 login Success')
       localStorage.setItem("token", res.data.token);
       navigate("/home");
     })
     .catch((err) => {
       console.log(err);
     });
    }
  })
  return (
    <div className="flex flex-col items-center  pt-20 bg-black w-full h-[100vh]">
      <h1 className="text-4xl text-white p-10 font-bold">Walter Admin Panel</h1>
      <div className="w-full max-w-xs ">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              placeholder="Email"
              value={values.name}
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          { errors.email && touched.email ?    <p className="text-red-400">{errors.email}</p>:null}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="******************"
              autoComplete="off"
             value={values.password}
             onChange={handleChange}
             onBlur={handleBlur}
            />
              {errors.password && touched.password ? <p className="text-red-400">{errors.password}</p>:null}
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
