import React, { Fragment, useEffect } from 'react'
import Carousel from "react-material-ui-carousel";
import ReactStars from 'react-rating-stars-component';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import "./ProductDetails.css";
import Loader from "../layout/Loader/Loader"
import ReviewCard from "./ReviewCard.js"
import { useAlert } from "react-alert"
import {
  Card,
  Container,
  Typography,
  CardContent,
  Button,
  Grid
} from "@material-ui/core";


const ProductDetails = () => {

  let { id } = useParams();

  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails);

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(id))
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20: 25,
    value: ratingChanged(),
    isHalf: true
}
function ratingChanged(){
  if(loading){
    return 0;
  }else{
  return product.ratings;
  }
};

  return (
    <Fragment>
      {
        loading ? (
        <Loader />
        ) : (
        <Fragment>
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
                <ReactStars {...options} />
                <span>{`( ${product.numberOfReviews} Revious )`}</span>
              </div>
              <div className='detailsBlock-3'>
                <h1>{`Rs. ${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                  <div className='detailsBlock-3-1-1'>
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>

                <p>
                  Status: 
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className='detailsBlock-4'>
                Description: <p>{product.description}</p>
              </div>
              <button className='submitReview'>Submit Review</button>
            </div>
          </div>

          <h3 className='reviewHeading'>Reviews</h3>
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