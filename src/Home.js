import React from 'react'
import './Home.css';
import Product from './Product';
function Home() {
  return (
    <div className="home">
        <div className='home__container'>
        <img className='home__image' 
        src='https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/SingleTitle/Runway34Launch/3000x1200_Hero-Tall_NP._CB635359872_.jpg' 
        alt=""
        />
        <div className='home__row'>
          <Product 
          id="12321341"
          title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback – 6 October 2011 ' 
          price={29.99} 
          image='https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg' 
          rating={3} 
          />
          <Product
          id="45621341"
          title='Starx Plastic Xpvc Dumbbell Set, Adult 1Kg, Set of 2 (Blue)' 
          price={19.99} 
          image='https://m.media-amazon.com/images/I/61Q-Mj7u7iL._SL1500_.jpg' 
          rating={4}
          />
        </div>
        <div className='home__row'>
          <Product
          id="45621691"
          title='Start With Why: The Inspiring Million-Copy Bestseller That Will Help You Find Your Purpose' 
          price={9.99} 
          image='https://m.media-amazon.com/images/P/B005JZD3B4.01._SCLZZZZZZZ_SX500_.jpg' 
          rating={3}
          />
          <Product
           id="45626789"
          title='Boldfit Compact Gym Shaker Bottle, Shaker Bottles For Protein Shake , Bpa Free Material, Plastic, Blue And Grey, 500ml ' 
          price={7.99} 
          image='https://m.media-amazon.com/images/I/71mjtedSW-L._SL1500_.jpg' 
          rating={3}
          />
          <Product
          id="98326341"
          title='American Tourister Casual Backpack ' 
          price={15.85} 
          image='https://m.media-amazon.com/images/I/91FvDEE9sCL._UL1500_.jpg' 
          rating={5}
          />
        </div>
        
        <div className='home__row'>
          <Product  
          id="95686341"
          title='Zebronics ZEB-FIT280CH Smart Watch with Screen Size 3.55cm (1.39inch) 12 Sports Modes, IP68 Waterproof, Heart Rate, BP, SpO2, Caller ID, 7 Days Storage (Black)' 
          price={39.99} 
          image='https://m.media-amazon.com/images/I/61VxuGKibQL._SL1500_.jpg' 
          rating={4}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
