import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import "./ProductDetails.css";
import Loader from "../layout/Loader/Loader"
import ReviewCard from "./ReviewCard.js"
import { useAlert } from "react-alert"
import {
  Container,
  Grid
} from "@material-ui/core";
import MetaData from '../layout/MetaData';
import { addItemsToCart } from "../../actions/cartAction";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {

  let params = useParams();

  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails);
    const {success, error: reviewError } = useSelector((state) => state.newReview)

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      return;
    }
    let qty = quantity + 1;
    setQuantity(qty);
  };

  const decreseQuantity = () => {
    if (1 >= quantity) {
      return;
    }
    let qty = quantity - 1;
    setQuantity(qty)
  }

  const addToCartHendler = () => {
    dispatch(addItemsToCart(params.id, quantity));
    alert.success("Item Added To Cart.");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);

  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id)

    dispatch(newReview(myForm));
    setOpen(false);
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors())
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({type: NEW_REVIEW_RESET})
      
    }
    dispatch(getProductDetails(params.id))
  }, [dispatch, params.id, error, alert, success, reviewError]);

  const options = {
    size: 'large',
    value: product.ratings,     //ratingChanged(),
    readOnly: true,
    precision: 0.5,
  }
  // function ratingChanged() {
  //   if (loading) {
  //     return 0;
  //   } else {
  //     return product.ratings;
  //   }
  // };

  return (
    <Fragment>
      {
        loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={`${product.name} -- ECOMMERCE`} />
            <div className='ProductDetails'>
              <div >
                <Container >
                  <Grid>
                    <Carousel >
                      {product.images &&
                        product.images.map((item, i) => (
                          <img // width={"200px"} height={"300px"}
                            className='CarouselImage'
                            key={item.url}
                            src={item.url}
                            alt={`${i} Slide`}
                          />
                        ))}
                    </Carousel>
                  </Grid>
                </Container>
              </div>
              <div>
                <div className='detailsBlock-1'>
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>

                </div>
                <div className='detailsBlock-2'>
                  <Rating {...options} />
                  <span className='detailsBlock-2-span'>{`( ${product.numberOfReviews} Reviews )`}</span>
                </div>
                <div className='detailsBlock-3'>
                  <h1>{`Rs. ${product.price}`}</h1>
                  <div className='detailsBlock-3-1'>
                    <div className='detailsBlock-3-1-1'>
                      <button onClick={decreseQuantity}>-</button>
                      <input readOnly type="number" value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHendler}>Add to Cart</button>
                  </div>

                  <p>
                    Status:
                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                      {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>
                <div className='detailsBlock-4'>
                  Description: <p>{product.description}</p>
                </div>
                <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
              </div>
            </div>

            <h3 className='reviewHeading'>Reviews</h3>

            <Dialog
              aria-labelledby='simple-dialog-title'
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className='submitDialog'>
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />
                <textarea
                  className='submitDialogTextArea'
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color="secondary">Cancle</Button>
                  <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
                </DialogActions>
              </DialogContent>

            </Dialog>


            {product.reviews && product.reviews[0] ? (
              <div className='reviews'>
                {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
              </div>
            ) : (
              <p className='noReviews'>No Reviews Yet.</p>
            )}
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default ProductDetails