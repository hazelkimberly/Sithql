import React from 'react';
import ReviewItem from './ReviewItem.jsx';

const ReviewsList = ({ reviewList, handleListIncrement, setModal, showButton }) => {

  return (
    <div className='review-list-container'>
      {
        reviewList.map(review => {
          return <ReviewItem key={review.review_id} review={review} />
        })
      }
      <div className='review-list-button-wrapper'>
        {showButton && <div className='more-reviews-button' onClick={handleListIncrement}> MORE REVIEWS </div>}
        <div className='add-review-button' onClick={() => setModal(true)}>
          ADD A REVIEW
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em'}}>
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ReviewsList;