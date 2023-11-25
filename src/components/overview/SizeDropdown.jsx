import React from 'react';

const SizeDropdown = ({ skus, updateSizeSelected }) => {

  return (
    <select
      name='Size'
      title='-Size-'
      className='overview-size-dropdown'
      id='overview-size-dropdown'
      onChange={(e) => {
        updateSizeSelected(e.target.value)
        document.getElementById('overview-size-dropdown').style.color = 'black' }}>
      <option hidden value={0}>-Size-</option>
      {skus.map((sku, index) => {
        return (
          <option key={'size-option-' + index} value={index}>{sku.quantity > 0 ? sku.size : sku.size + ' Out of Stock!'}</option>
        );
      })}

    </select>
  )
}

export default SizeDropdown;