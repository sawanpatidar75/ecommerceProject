import React, { Fragment, useState } from 'react'
import { useNavigate  } from "react-router-dom";
import MetaData from '../layout/MetaData';
import "./Search.css";

const Search = () => {
    const navigate  = useNavigate ();

    const [keyword, setKeyword] = useState("")

    const searchSubmitHendler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate('/products');
        }
    };

    return (
        <Fragment>
            <MetaData title="Search A PRODUCTS -- ECOMMERCE" />
            <form className='searchBox' onSubmit={searchSubmitHendler}>
                <input type="text" placeholder="Search a Product..." onChange={(e) => setKeyword(e.target.value)} />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    )
}

export default Search