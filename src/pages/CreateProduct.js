import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET } from "../utils/constants";
import showToast from "../utils/toast/showToast";

const CreateProduct = () => {
  const navigate = useNavigate();
  const backend_url = process.env.REACT_APP_BACKEND_URI;

  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

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
        }
      })
      .catch((err) => console.error(err));
  };

  const onFileUpload = () => {
    const data = { name, description, price, img: url };
    console.log(data);
    axios
      .post(`${backend_url}api/products/save`, data, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
       showToast('🦄 Product Added!')
        setName("");
        setPrice(0);
        setDescription("");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card color="transparent" shadow={false} className="m-auto">
      <Typography variant="h4" color="blue-gray">
        Add Product
      </Typography>

      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Product Name
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Product description
          </Typography>
          <Input
            size="lg"
            placeholder="Elegant designing optimized earphone"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Price
          </Typography>
          <Input
            type="number"
            size="lg"
            placeholder="5999"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex">
          <div className="mt-4">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={onFileChange}
            />
            <label
              for="fileInput"
              className=" font-bold border border-gray-400 px-4 py-2 "
            >
              Choose
            </label>
            <span id="fileName"></span>
          </div>
          <div>
            {url ? (
              <img src={url} alt="product" className="w-20 h-20 mt-2" />
            ) : null}
          </div>
        </div>

        <Button className="mt-6" fullWidth onClick={onFileUpload}>
          Add
        </Button>
      </form>
    </Card>
  );
};

export default CreateProduct;
