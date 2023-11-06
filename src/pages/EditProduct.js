import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from "../utils/constants";
const EditProduct = () => {
  
  const { productId } = useParams();
  const [singleProduct, setSingleProduct] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const backend_url = process.env.REACT_APP_BACKEND_URI;

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== "") {
          const uploadedFileUrl = data.secure_url;
          setUrl(uploadedFileUrl);
          // localStorage.setItem('passportUrl', uploadedFileUrl);
        }
      })
      .catch((err) => console.error(err));
  };

  const getProductById = async () => {
    const data = await fetch(`${backend_url}api/products?id=${productId}`, {
      headers: {
        "Authorization": localStorage.getItem("token"),
      },
    });
    const res = await data.json();
    setSingleProduct(res.product);
  };

  useEffect(() => {
    getProductById();
  }, []);

  useEffect(() => {
    setData((prevData) => {
      const newData = { ...prevData }; // Create a copy of the previous data

      if (name !== "") {
        newData.name = name;
      }

      if (description !== "") {
        newData.description = description;
      }

      if (price !== 0) {
        newData.price = price;
      }

      if (url !== "") {
        newData.img = url;
      }

      return newData; // Return the updated data object
    });
  }, [name, description, price, url]);

  const handleSave = () => {
    axios
      .put(`${backend_url}api/products?id=${singleProduct[0]._id}`, data, {
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      });

    toast("🦄 Product Saved!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/home");
  };

  const handleEdit = () => {
    setIsDisabled(false);
  };

  return (
    <div className="m-auto">
      {singleProduct.map((item) => {
        return (
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Edit Product
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              cutomize the basic information
            </Typography>
            <div className="flex">
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Product Name
                  </Typography>
                  <Input
                    size="lg"
                    placeholder={`${item.name}`}
                    className="  !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder-gray-700 font-bold "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isDisabled}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Product Description
                  </Typography>
                  <Input
                    size="lg"
                    placeholder={`${item.description}`}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder-gray-700  "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isDisabled}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Product Price
                  </Typography>
                  <Input
                    type="number"
                    size="lg"
                    placeholder={`${item.price}`}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder-gray-700 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={isDisabled}
                  />
                </div>

                <div>
                  {isDisabled ? (
                    <Button className="mt-6" fullWidth onClick={handleEdit}>
                      Edit
                    </Button>
                  ) : (
                    <Button className="mt-6" fullWidth onClick={handleSave}>
                      Save
                    </Button>
                  )}
                </div>
              </form>
              <div className="grid place-content-center">
                <img
                  src={url ? url : item.img}
                  alt="product"
                  className="h-52 w-52 object-cover object-center"
                />
                <div class="custom-file-input">
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    disabled={isDisabled}
                    onChange={onFileChange}
                  />
                  <label
                    for="fileInput"
                    className={
                      isDisabled
                        ? "ml-14 font-bold border border-gray-400 px-4 py-2 bg-gray-400"
                        : "ml-14 font-bold border border-gray-400 px-4 py-2 "
                    }
                  >
                    Change
                  </label>
                  <span id="fileName"></span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default EditProduct;
