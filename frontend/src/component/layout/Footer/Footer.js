import React from 'react';
import "./Footer.css";
import playstore from "../../../images/playstore.png";
import Appstore from "../../../images/Appstore.png";

function Footer() {
  return (
    <footer id="footer">
        <div className='leftFooter'>
            <h4>Download Our APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playstore} alt="playstore"/>
            <img src={Appstore} alt="Appstore"/>

        </div>
        <div className='midFooter'>
            <h4>ECOMMERCE.</h4>
            <p>High Quality is our first priority</p>
            <p>Copyrights 2021 &copy; MeSawanPatidar</p>

        </div>
        <div className='rightFooter'>
            <h4>Follow Us</h4>
            <a href=''>Instagram</a>
            <a href=''>Facebook</a>
            <a href=''>Youtube</a>

        </div>


    </footer>
  )
}

export default Footer