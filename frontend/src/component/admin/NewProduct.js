import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createProduct } from '../../actions/productAction';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import MetaData from '../layout/MetaData';
import './newProduct.css';
import Sidebar from './Sidebar';

const NewProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Leptop",
        "Mobile",
        "Footwear",
        "Bootom",
        "Tops",
        "Tablet1",
        "Screen",
        "Desktop",
        "Attire",
        "Camera",
        "SmartPhones",
      ]

      useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (success) {
            alert.success("product Created Successfully")
            navigate("/admin/dashboard");
            dispatch({type: NEW_PRODUCT_RESET})
        }
      }, [dispatch, alert, success, error, navigate]);
      

      const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('description', description);
        myForm.set('category', category);
        myForm.set('stock', stock);

        images.forEach((image) => {
            myForm.append('images', image);
        });
        dispatch(createProduct(myForm));
      }

      const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            }

            reader.readAsDataURL(file)
        })
      }


  return (
    <Fragment>
        <MetaData title="Create Product" />
        <div className='dashboard'>
            <Sidebar />
            <div className='newProductContainer'>
                <form
                    className='createProductForm'
                    encType='multipart/form-data'
                    onSubmit={createProductSubmitHandler}
                >
                    <h1> Create Product</h1>
                    <div>
                        <Spellcheck />
                        <input 
                            type='text'
                            placeholder='Product Name'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <AttachMoney />
                        <input 
                            type='number'
                            placeholder='Price'
                            required
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <Description />
                        <textarea 
                            placeholder='Product Description'
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            cols="30"
                            rows='1'
                        ></textarea>
                    </div>
                    <div>
                        <AccountTree />
                        <select 
                            onChange={(e) => setCategory(e.target.value)}>
                                <option value=''>Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                    </div>
                    <div>
                        <Storage />
                        <input 
                            type="number"
                            placeholder='Stock'
                            required
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div id="createProductFromFile">
                        <input
                            type='file'
                            name='avatar'
                            accept='image/*'
                            onChange={createProductImagesChange}
                            multiple
                        />
                    </div>
                    <div id='createProductFromImage'>
                        {imagesPreview.map((image, index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}

                    </div>

                    <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={loading ? true : false}
                    > Create</Button>
                    


                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default NewProduct