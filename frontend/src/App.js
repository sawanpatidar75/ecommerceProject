import './App.css';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import React from 'react';
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import ProductDetails from './component/Product/ProductDetails.js';
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js";

function App() {

  React.useEffect(()=>{
    webFont.load({
      google:{
        families:['Roboto','Droid Sans','Chilanka']
      }
    })
  },[]);


  return (

    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails/>} /> 
          <Route exact path='/products' element={<Products/>} /> 
          <Route exact path='/search' element={<Search/>} /> 
          {/* element={<ProductDetails/>} */}
        </Routes>
        <Footer />
      </Router>
    </>
  // <Router>
  //   <Header />
  //   <Route exact path="/" component={Home} />
  //   <Footer />
  // </Router>
  );
    

}

export default App;
