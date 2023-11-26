import React, { useState, useEffect, useMemo, memo } from 'react';
import StarRating from '../../components/star-rating/StarRating.jsx';
import { updateHelpfulness, reportReview } from '../lib/fetchFunctions.js';
import { convertDate } from '../lib/utilityFunctions.js';

const ReviewItem = ({ review }) => {
  const { reviewer_name, rating, email, date, summary, response,
    body, photos, recommend, helpfulness, review_id } = review;

  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(true);
  const [helpful, setHelpful] = useState(helpfulness);
  const formattedDate = useMemo(() => convertDate(date), [date]);

  useEffect(() => {
    body.length > 250 ? setShow(false) : '';
  }, [])

  const handleHelpfulClick = (id) => {
    if (clicked) return;
    updateHelpfulness(id)
      .then(result => {
        setHelpful(helpful + 1);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setClicked(true);
      })
  };

  const handleReportClick = (id) => {
    if (clicked) return;
    reportReview(id)
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setClicked(true);
      })
  }

  return (
    <div className='review-wrapper'>
      <div className='review-header'>
        <StarRating rating={rating} />
        <div style={{ marginLeft: 'auto' }}>
          {email && <span>&#10003;</span>}
          <span style={{ fontWeight: 'bold' }}>{reviewer_name}</span>, {formattedDate}
        </div>
      </div>
      <div className='review-summary'>{summary}</div>

      <div className='review-body'>
        {show
          ? <div>{body}</div>
          : <div>
              {body.slice(0,250)}...
              <div className='show-more-button' onClick={() => setShow(true)}>Show more</div>
            </div>
        }
      </div>
      {
        photos.map(photo => {
          return <img  key={photo.id} src={photo.url} alt='Reviewer picture' width='150px' onError={e => { e.target.src = 'https://i.imgur.com/mYzivnl.png'}}/>
        })
      }

      {recommend && <div>&#10003; I recommend this product</div>}

      {response &&
        <div className='review-response'>
          <span style={{ fontWeight: 600 }}>Reponse from Seller:</span>
          <span style={{ textIndent: '1em' }}>{response}</span>
        </div>
      }

      <div className='helpfulness-wrapper'> Helpful?
        <span className='helpful-review' onClick={() => handleHelpfulClick(review_id)}>Yes</span>
        {`(${helpful}) | `}
        <span onClick={() => handleReportClick(review_id)}>Report</span>
      </div>
    </div>
  )
}

export default memo(ReviewItem);