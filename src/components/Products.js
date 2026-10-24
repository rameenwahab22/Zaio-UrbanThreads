import React from 'react';
import Product from './Product';
import './Products.css';

const Products = () => {
  return (

    <>
    <div className="products__row">
      <Product id="1"
      title="Offstage Oversized Tee Volcanic"
      image="https://whitefoxboutique.com.au/cdn/shop/files/18.08.2350164.jpg?v=1694048254&width=550"
     description ="This oversized tee is made from soft, breathable cotton and features a relaxed fit for ultimate comfort. Perfect for casual wear or layering."
      rating={4}
      price={55.99}
      />

      <Product id="1"
      title="Release 15 Asalia Wide Leg Sweatpants Grey Marle"
      image="https://whitefoxboutique.com.au/cdn/shop/files/white-fox-release-15-asalia-wide-leg-sweatpants-grey-marle-grey-release-15-janie-boxy-zip-front-hoodie-grey-marle-grey-8.1.2613.jpg?v=1768957702&width=550"
      description="These sweatpants are made from soft, breathable cotton and features a relaxed fit for ultimate comfort. Perfect for casual wear."
      rating={5}
      price={89.99}
      />
    </div>

    <div className="products__row">
      <Product id="1"
      title="Release 15 Janie Boxy Zip Front Hoodie Grey Marle"
      image="https://whitefoxboutique.com.au/cdn/shop/files/white-fox-release-15-asalia-wide-leg-sweatpants-grey-marle-grey-release-15-janie-boxy-zip-front-hoodie-grey-marle-grey-8.1.2610.jpg?v=1768956969&width=550"
      description="This hoodie is made from soft, breathable cotton and features a relaxed fit for ultimate comfort. Perfect for casual wear or layering."
      rating={4}
      price={159.99}
      />

      <Product id="1"
      title="Offstage Oversized Tee Volcanic"
      image="https://whitefoxboutique.com.au/cdn/shop/files/18.08.2350164.jpg?v=1694048254&width=550"
      description="This oversized tee is made from soft, breathable cotton and features a relaxed fit for ultimate comfort. Perfect for casual wear or layering."
      rating={5}
      price={59.99}
      />

      <Product id="1"
      title="Always Moving Quilted Tote Bag Black"
      image="https://whitefoxboutique.com.au/cdn/shop/files/ALWAYS_MOVING_QUILTED_TOTE_BAG_GHOST_01_1.jpg?v=1721173890&width=550"
      description="This tote bag is made from soft, breathable cotton and features a relaxed fit for ultimate comfort and style. Perfect for casual wear or a fancy night out."
      rating={5}
      price={200.00}
      />
    </div>

     <div className="products__row">
      <Product id="1"
      title="Vivid Light Oversized Hoodie Posy"
      image="https://whitefoxboutique.com.au/cdn/shop/files/white-fox-birthday-lounge-accessories_1024x1024@2x.progressive.jpg?v=1790732373"
      description="The Vivid Light Oversized Hoodie Posy Black features a double lined hood, long sleeves, front pocket and an oversized silhouette for that effortlessly slouchy fit."
      rating={4}
      price={40.89}
      />

    </div>


    </>
  )
}

export default Products;
