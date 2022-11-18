import React, { Fragment, useState } from 'react'

const Search = (history) => {

    const [keyword, setKeyword] = useState("")

    const searchSubmitHendler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/products/${keyword}`);
        }else{
            history.push('/products');
        }
    };

    return (
        <Fragment>
            <form className='searchBox' onSubmit={searchSubmitHendler}>
                <input type="text" placeholder="Search a Product..." onChange={(e) => setKeyword(e.target.value)} />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    )
}

export default Search