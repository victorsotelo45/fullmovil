import ProductTypes from '../components/digitalProductSale/productTypes';

function HeroHome() {



  return (
    <section className="relative" >    

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl text-white font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">¡Recarga <span className="bg-clip-text  text-white">tu vida!</span></h1>
            <div className="max-w-3xl mx-auto">
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">

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