import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import 'bootstrap/dist/css/bootstrap.min.css';

import image1 from '../assets/001.jpg';
import image2 from '../assets/002.jpg';
import image3 from '../assets/003.jpg';
import image4 from '../assets/004.jpg';
import image5 from '../assets/005.jpg';
import image6 from '../assets/006.jpg';
import image7 from '../assets/007.jpg';
import image8 from '../assets/008.jpg';
import image9 from '../assets/009.jpg';
import image10 from '../assets/010.jpg';
import image11 from '../assets/011.jpg';

import classes from './Masonry.module.scss';

const items = [
    image1,
    image2,
    image10,
    image11,
    image4,
    image5,
    image6,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image4,
    image5,
    image6,
    image7,
    image8,
];

const MasonryGrid = () => {
    const gridRef = useRef(null);

    useEffect(() => {
        if (gridRef.current) {
            const msnry = new Masonry(gridRef.current, {
                itemSelector: '.grid-item',
                percentPosition: true,
            });

            return () => {
                msnry.destroy();
            };
        }
    }, []);

    return (
        <div className="container d-flex my-2 justify-content-center">
            <div className="grid row g-2 w-100 align-items-center" ref={gridRef}>


                {items.map(e => {
                    return (
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2 grid-item">
                            <div className={classes.card}>
                                <img src={e} className="card-img-top" />
                            </div>
                        </div>
                    )
                })}
            </div>
         </div>
    );
}

export default MasonryGrid;