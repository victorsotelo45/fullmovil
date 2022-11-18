import React from 'react';

import Header from '../partials/Header';
import HeroHome from '../partials/Home';
import FeaturesHome from '../partials/Features';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import Testimonials from '../partials/Testimonials';
import Newsletter from '../partials/Newsletter';
import Footer from '../partials/Footer';
import Banner from '../partials/Banner';

import "./styles.css";

function Home() {

  const mainStyle = {
    height: "100%",
    background: "url(https://web.fullmovil.com.co/wp-content/uploads/2021/11/Full-movil-banner-home-3.png) no-repeat center center fixed",
    WebkitBackgroundSize: "cover",
    MozBackgroundSize: "cover",
    OBackgroundSize: "cover",
    BackgroundSize: "cover"
  }


  return (
    <div className="flex flex-col min-h-screen overflow-hidden">


      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow" style={mainStyle}>

        {/*  Page sections */}
        <HeroHome />

        {/*  <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials />
        <Newsletter /> */}

      </main>

      {/* <Banner /> */}

      {/*  Site footer */}
      {/* <Footer /> */}

    </div>
  );
}

export default Home;