import React ,{ useState } from 'react';
import jQuery from 'jquery';
import  { Component } from "react";
import data from '../assets/product.json';
import Product from './product';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Home = ({ cart, setcart }) => {
  
  const [products] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [clickedProduct, setClickedProduct] = useState({});
  const [scrolledProductId, setScrolledProductId] = useState(null);
  
  const handleScroll = (index) => {
    setScrolledProductId(products[index].id);
  };
  const addItem = (productId) => {
    const product = products.find((e) => e.id === productId);
    if (product) {
      setcart([...cart, product]);
    }
  };

  const removeCart = (productid) => {
    setcart(cart.filter((c) => c.id!== productid));
  };

  const removeItem = (productId) => {
    removeCart(productId);
  };

  const settings = {
    className: "center",
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    centerMode: true,
    speed: 500,
    centerPadding: 60,
  
    

    cssOverride: {
      '.slick-dots': {
        display: 'block',
      },
      
    },


    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  
  return (
    <>
       
       <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="./images/briyani1.jpg" class="d-block w-100" alt="..."/>
      <div class="carousel-caption  d-md-block animated fadeInDown" >
        <h1 >Briyani-The  <span style={{color:"orange",fontSize:"60px"}}>King</span> Of food..</h1>
        <p>This dish, which was served to the soldiers of the Chera kings in Kerala, was said to be made of rice, ghee, meat, turmeric, coriander, pepper, and bay leaf. The spices utilized in the preparation of South Indian biryanis, such as those used in the Malabar variety, are distinctive to the region and the Western Ghats.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="./images/img1.jpg" class="d-block w-100" alt="..."/>
      <div class="carousel-caption text-center d-md-block animated fadeInUp" >
        <h1>Cooking is An  <span style={{color:"orange",fontSize:"60px"}}>Art..</span> </h1>
        <p>When you prepare your own meals, you have more control over the ingredients. By cooking for yourself, you can ensure that you and your family eat fresh, wholesome meals. This can help you to look and feel healthier, boost your energy, stabilize your weight and mood, and improve your sleep and resilience to stress.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="./images/img4.jpg" class="d-block w-100" alt="..."/>
      <div class="carousel-caption  d-md-block animated fadeInDown" >
        <h1>Tasty & <span style={{color:"orange",fontSize:"60px"}}>Healthy</span> </h1>
        <p>Tasty food and the anticipation of eating a great meal improves digestion in more ways than one. When you look forward to eating your meal and start taking in all its delicious aromas, you trigger the release of digestive enzymes in your body.</p>
      </div>
    </div>
  </div>
  
</div>


<div className="container-fluid">
  <div className="slider-container">
    <Slider {...settings} afterChange={handleScroll} autoplay={true} autoplaySpeed={2000}>
      {products.map((product) => (
        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 col-6">
          <div className={`card mb-3 m-3 ${product.id === scrolledProductId? 'crolled-card' : ''}`}>
            <img src={product.image} className="card-img" alt="Product Image" />
            <img src="/images/logo.png" className="logo-image" alt="Logo Image" style={{
              width: 80,
              height: 80,
              position: 'absolute',
              top: -20,
              right: 20,
            }} />
            <div className="card-body">
              <div className="row">
                <h5 className="card-title col-6">{product.name}</h5>
                <span className="price-tag col-6">Rs{product.price}</span>
              </div>
              <div className="offer-badge">
                <span className="rating">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-alt" />
                  <i className="fa fa-star" />
                </span>
              </div>
              <p className="card-text">{product.description}</p>
              {cart.includes(product)? (
                <button
                  onClick={() => removeItem(product.id)}
                  className="btn sliderbtn2 btn-block"
                >
                  Remove from Cart
                </button>
              ) : (
                <button 
                  onClick={() => addItem(product.id)}
                  className="btn sliderbtn1 btn-block"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
</div>
    
<div className="container  mt-5">
  <div className="row justify-content-center mb-2">
    <div className="col-md-8 col-lg-6 col-xl-6 col-sm-10 col-12">
      <div className="input-group">
        <input
          type="text"
          className="form-control ps-4"
          placeholder="Search your Foods here..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="input-group-text">
          <i className="fa fa-search"></i>
        </span>
      </div>
    </div>
  </div>
</div>


        
        <div className="container">
          <div className="row">
            {searchTerm.length > 0 &&
              products.map((e) =>
                e.name.toLowerCase().includes(searchTerm.toLowerCase())? (
                  <div key={e.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                    <div className="card mb-3">
                      <img src={e.image} className="card-img-top" alt="Product Image" />
                      <div className="card-body">
                        <h5 className="card-title">{e.name}</h5>
                        <p className="card-text">Product Price: Rs{e.price}</p>
                        {cart.some((c) => c.id === e.id)? (
                          <button
                            onClick={() => removeItem(e.id)}
                            className="btn btn-danger sliderbtn2 btn-block"
                          >
                            Remove from Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => addItem(e.id)}
                            className="btn btn-primary sliderbtn1 btn-block"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
          </div>
        </div>

        <div className="container">
          <div className="row">
          
            {products.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                <Product product={product} cart={cart} setcart={setcart} />
              </div>
            ))}  
          </div>
        </div>






        <footer class="footer">
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-sm-12">
      <center><p>&copy; 2023 <span style={{color:"orange",fontSize:"27px"}}>Foodcart</span> All rights reserved.</p></center> 
      </div>
      <div class="col-md-6 col-sm-12">
        <ul class="social-links"> Get <span style={{color:"orange",fontSize:"27px"}}>Touch</span> with us <span>------</span>
          <li><a href="https://www.facebook.com/login/" target="_blank"><i class="fa fa-facebook-f"></i></a></li>
          <li><a href="https://x.com/home" target="_blank"><i class="fa fa-twitter"></i></a></li>
          <li><a href="https://www.instagram.com/accounts/login/?hl=en" target="_blank"><i class="fa fa-instagram"></i></a></li>
          <li><a href="#" target="_blank"><i class="fa fa-linkedin-in"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
      
    </>
  );
};

export default Home;
