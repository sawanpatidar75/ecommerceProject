import React from 'react'
 import profilePng from "../../images/userProfile.png"
 import { Rating } from '@mui/material';


const ReviewCard = ({review}) => {

  const options = {
    value: review.rating,   //ratingChanged(),
    readOnly: true,
    precision: 0.5,
  }
  return (
    <div className='reviewCard'>
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span className='reviewCardComment'>{review.comment}</span>

    </div>
  )
}

export default ReviewCard