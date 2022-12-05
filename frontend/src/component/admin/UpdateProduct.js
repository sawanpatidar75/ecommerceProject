import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, updateProduct, getProductDetails } from '../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

const UpdateProduct = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, product } = useSelector((state) => state.productDetails);
    const { loading, error:updateError, isUpdated } = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
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

      const productId = params.id

      useEffect(() => {

        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        }else{
            setName(product.name);
            setDescription(product.description)
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock)
            setOldImages(product.images);
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors)
        }
        if (isUpdated) {
            alert.success("product Created Successfully")
            navigate("/admin/products");
            dispatch({type: UPDATE_PRODUCT_RESET})
        }
      }, [dispatch, alert, isUpdated, error, navigate, productId, product, updateError]);
      

      const updateProductSubmitHandler = (e) => {
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
        dispatch(updateProduct(productId,myForm));
      }

      const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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
                    onSubmit={updateProductSubmitHandler}
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
                            value={price}
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
                            value={category}
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
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div id="createProductFromFile">
                        <input
                            type='file'
                            name='avatar'
                            accept='image/*'
                            onChange={updateProductImagesChange}
                            multiple
                        />
                    </div>
                    
                    <div id='createProductFromImage'>
                        {oldImages && oldImages.map((image, index) => (
                            <img key={index} src={image.url} alt="Product Preview" />
                        ))}

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

export default UpdateProduct