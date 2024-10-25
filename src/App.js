import logo from './logo.svg';
import './App.css';
// import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Card, Button } from 'react-bootstrap';
import InfoCard from './components/Card';
import image1 from './assets/001.jpg';
import image2 from './assets/002.jpg';
import image3 from './assets/003.jpg';
import image4 from './assets/004.jpg';
import image5 from './assets/005.jpg';
import image6 from './assets/006.jpg';
import image7 from './assets/007.jpg';
import image8 from './assets/008.jpg';
import image9 from './assets/009.jpg';
import image10 from './assets/010.jpg';
import image11 from './assets/011.jpg';

// Import Bootstrap JavaScript (for functionality like carousels)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import RCarousel from './components/Carousel';
import Slider from './components/Carousel';
import MasonryGrid from './components/Masonry';
import Header from './components/Header';
import { useState } from 'react';
import NewSlider from './components/NewSlider';

function App() {
  const [state, setState] = useState(true);

  const clickHandler = () => {
    setState(!state)
  }

  return (
    <>
      {
        state &&
        <>
          <Header onClick={clickHandler}/>
          <Slider />
        </>
      }
      {
        !state && 
        <MasonryGrid />
      }
    </>
  );
}

export default App;
