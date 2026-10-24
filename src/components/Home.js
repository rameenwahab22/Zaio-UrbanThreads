import React from 'react';
import './Home.css';
import Products from './Products';

export const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img  className="home_image" src="https://media.istockphoto.com/id/1472077979/vector/cute-background-illustration-with-pastel-colored-confetti-dancing-in-the-air.jpg?s=612x612&w=0&k=20&c=_3kEnzsqEJdStz3b4UQQYsWssrcH-VDkuaaS2dluLvk=" alt="Home Banner" />
        <Products />
      </div>
    </div>
    
    

  )
}

export default Home;