import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
        <div className='banner__card'>
            <span><i className="ri-truck-line"></i></span>
            <h4>Free Delivery</h4>
            <p>Fast, free delivery on eligible orders.</p>
        </div>
        <div className='banner__card'>
            <span><i className="ri-money-dollar-circle-line"></i></span>
            <h4>100% Money Back Guranteed</h4>
            <p>Changed your mind? Return unworn items within 14 days for a full refund.</p>
        </div>
        <div className='banner__card'>
            <span><i className="ri-user-voice-fill"></i></span>
            <h4>Strong Support</h4>
            <p>Need help? Email us @ support@ngutopproductsandservices.com.</p>
        </div>
    </section>
  )
}

export default PromoBanner