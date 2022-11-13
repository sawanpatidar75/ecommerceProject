import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";

// const product = {
//     name: "Blue Tshirt",
//     images: [{ url: "data:image/jpeg;base64,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"}],
//     price: "Rs.3000",
//     _id: "abhishek,"
// }

const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  
  useEffect(() => {
    if(error){
      return alert.error(error)
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p> Welcome to Ecommerce.</p>
            <h1>FIND AMAZING PRODUCT BELOW.</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;