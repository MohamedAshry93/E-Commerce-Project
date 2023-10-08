import React from 'react';
import Style from './Footer.module.scss';
export default function Footer() {
  return (
    <footer className='bg-main-light py-5'>
      <div className="container">
        <h4 className='fw-bold'>Get the FreshCart app</h4>
        <p>We will send you a link, open it on your phone to download the app</p>
        <div className='d-flex'>
          <div className="col-md-10">
            <input className='form-control py-2' type="email" name="email" id="email" placeholder='Email...' />
          </div>
          <div className="col-md-2 ps-3">
            <button className='btn bg-main text-white w-100'>Share App Link</button>
          </div>
        </div>
        <div className='border-bottom line border-2 my-4'></div>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <span className='fw-bold'>Payment Partners</span>
            <i className="fa-brands fa-cc-amazon-pay mx-2 fs-2"></i>
            <i className="fa-brands fa-cc-amex fs-2"></i>
            <i className="fa-brands fa-cc-mastercard mx-2 fs-2"></i>
            <i className="fa-brands fa-cc-paypal fs-2"></i>
          </div>
          <div>
            <span className='fw-bold'>Get deliveries with FreshCart</span>
            <a href="/" tabIndex="0"><img className="bn46 mx-2" src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="bn45" /></a>
            <a href="/" tabIndex="0"><img className="bn45" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="bn45" /></a>
          </div>
        </div>
        <div className='border-bottom line border-2 my-4'></div>
      </div>
    </footer>
  )
}
