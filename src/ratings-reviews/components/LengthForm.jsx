import React from 'react';

const LengthForm = () => {
  return (
    <>
      <p>Length</p>
      <div className='product-input-wrapper'>
        <div className='input-wrapper-column'>
          <input id='length-1' name='length' type='radio' />
          <label htmlFor='length-1'>Too short</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='length-2' name='length' type='radio' />
          <label htmlFor='length-2'>Slightly short</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='length-3' name='length' type='radio' />
          <label htmlFor='length-3'>Perfect</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='length-4' name='length' type='radio' />
          <label htmlFor='length-4'>Slightly long</label>
        </div>
        <div className='input-wrapper-column'>
          <input id='length-5' name='length' type='radio' />
          <label htmlFor='length-5'>Too long</label>
        </div>
      </div>
    </>
  )
}

export default LengthForm;

