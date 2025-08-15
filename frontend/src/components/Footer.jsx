import React from 'react'

import instaIgm1 from "../assets/instagram-1.jpg"
import instaIgm2 from "../assets/instagram-2.jpg"
import instaIgm3 from "../assets/instagram-3.jpg"
import instaIgm4 from "../assets/instagram-4.jpg"
import instaIgm5 from "../assets/instagram-5.jpg"
import instaIgm6 from "../assets/instagram-6.jpg"

const Footer = () => {
  return (
    <>
    <footer className='section__container footer__container'>
        <div className='footer__col'>
            <h4>CONTACT INFO</h4>
            <p>
                <span><i className="ri-map-pin-2-fill"></i></span>
                123, London Bridge Street, London.
            </p>
            <p>
                <span><i className="ri-mall-fill"></i></span> 
                support@lebaba.com
            </p>
            <p>
                <span><i className="ri-phone-fill"></i></span>
                (+012) 345689
            </p>
        </div>

        <div className='footer__col'>
            <h4>COMPANY</h4>
            <a href="/">Home</a>
            <a href="/">About Us</a>
            <a href="/">Work With Us</a>
            <a href="/">Our Blogs</a>
            <a href="/">Terms & Conditions</a>
        </div>

         <div className='footer__col'>
            <h4>USEFUL LINK</h4>
            <a href="/">Help</a>
            <a href="/">Track Your Order</a>
            <a href="/">Men</a>
            <a href="/">Women</a>
            <a href="/">Dresses</a>
        </div>
        <div className='footer__col'>
            <h4>INSTAGRAM</h4>
            <div className='instagram__grid'>
                <img src={instaIgm1} alt="" />
                <img src={instaIgm2} alt="" />
                <img src={instaIgm3} alt="" />
                <img src={instaIgm4} alt="" />
                <img src={instaIgm5} alt="" />
                <img src={instaIgm6} alt="" />
            </div>
        </div>
    </footer>

    <div className='footer__bar'>
        Copyright @ 2025 by Lebaba. All rights Reserved.

    </div>

    </>
  )
}

export default Footer