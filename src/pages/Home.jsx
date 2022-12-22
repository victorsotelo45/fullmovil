import React from 'react';

import Header from '../partials/Header';
import HeroHome from '../partials/Home';

import "./styles.css";
import { BACKGROUND_IMAGE } from '../lib/envariables';

function Home() {

  const mainStyle = {
    height: "100%",
    background: `url(${BACKGROUND_IMAGE}) no-repeat center center fixed`,
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


      </main>

    </div>
  );
}

export default Home;