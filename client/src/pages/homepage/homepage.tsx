import React from 'react';
import backgroundImage from '../../assets/backgroundImage.jpg';
import './homepage.styles.scss'
const Homepage = () => {
    return (
        <div className="homepage">
            <img className='home-image' src={backgroundImage} alt="backgorund"/>
            <div className='homepage-banner'>
                <p className='banner-text'>Not sure where to go? Perfect?</p>
                <button className='banner-button'>I'm flexible</button>
            </div>
        </div>
    );
};

export default Homepage;