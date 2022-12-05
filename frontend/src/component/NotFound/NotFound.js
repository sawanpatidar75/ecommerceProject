import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './notFound.css'

const NotFound = () => {
    return (
        <Fragment >
            <div className='notFoundContainer'>
                <img src='./pngwing.com' alt='Page Not found' />
                <h1 className='notFoundHeading'> Page Not Found</h1>
                <Link className='notFoundLink' to='/'>Home</Link>
            </div>

        </Fragment>
    )
}

export default NotFound