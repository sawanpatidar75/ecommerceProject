import './App.css';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import React from 'react';
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"



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
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
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
