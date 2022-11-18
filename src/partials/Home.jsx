import React, { useState } from 'react';
import Modal from '../utils/Modal';

import HeroImage from '../images/hero-image.png';
import ProductTypes from '../components/digitalProductSale/productTypes';

function HeroHome() {

  const homeStyle ={    
      background: "url(https://web.fullmovil.com.co/wp-content/uploads/2021/11/Full-movil-banner-home-3.png) no-repeat center center fixed",
      WebkitBackgroundSize: "cover",
      MozBackgroundSize: "cover",
      OBackgroundSize: "cover",
      BackgroundSize: "cover"
    }
  

  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative" >    

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl text-white font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">¡Recarga <span className="bg-clip-text  text-white">tu vida!</span></h1>
            <div className="max-w-3xl mx-auto">
              {/* <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p> */}
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">

              {/*   <div>
                  <a className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0">Start free trial</a>
                </div>
                <div>
                  <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Learn more</a>
                </div> */}

                <ProductTypes/>
                
              </div>
            </div>
          </div>

        

        </div>

      </div>
    </section>
  );
}

export default HeroHome;