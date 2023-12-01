import React, { memo } from 'react';
import StarRating from '../../components/star-rating/StarRating.jsx';
import Price from '../../components/price/Price.jsx';
import '../styles/productCardStyles.css';

const ProductCard = ({
  productInfo, defaultStyle, rating, productCardClick, actionButtonClick, actionButton,
}) => (
  <div className='product-card' onClick={() => { productCardClick(productInfo.id); }}>
    <div>
      <div className='image-container'>
        <img src={defaultStyle.photos[0].thumbnail_url ? defaultStyle.photos[0].thumbnail_url : 'https://i.imgur.com/mYzivnl.png'} alt={productInfo.name} />
        <button
          type='button'
          className='action-button'
          onClick={(e) => {
            e.stopPropagation();
            actionButtonClick(productInfo);
          }}
        >
          {actionButton}
        </button>
      </div>
      <p>{productInfo.category}</p>
      <h3>{productInfo.name}</h3>
      <Price selectedStyle={{ original_price: defaultStyle.original_price, sale_price: defaultStyle.sale_price }} />
      <StarRating rating={rating} />
    </div>
  </div>
);

export default memo(ProductCard);
