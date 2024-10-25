import { useEffect, useRef, useState } from 'react';
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
import InfoCard from './Card';
import classes from './NewSlider.module.scss';

const items = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11
];



const NewSlider = () => {
    const [transition, setTransition] = useState(0);
    const [leftEdge, setLeftEdge] = useState(false);
    const [rightEdge, setRightEdge] = useState(false);
    let stepWidth = 0;

    const containerRef = useRef()

    useEffect(() => {
        if (containerRef.current == null) return

        const observer = new ResizeObserver(entries => {
            const container = entries[0]?.target

            if (container == null) return

            setLeftEdge(transition > 0)
            setRightEdge(
                transition + container.clientWidth < container.scrollWidth
            )
        })

        observer.observe(containerRef.current)

        const currentEdge = containerRef.current.scrollWidth;

        stepWidth = currentEdge / items.length

        return () => {
            observer.disconnect()
        }
    })

    const rightClickHandler = () => {
        setTransition(prev => {
            if (containerRef.current == null) {
                return transition
            }
            const newValue = prev + stepWidth;
            // const edge = containerRef.current.scrollWidth;
            // const width = containerRef.current.clientWidth;

            // console.log("edge: " + edge)
            // console.log("width: " + width)

            // if (newValue + width >= edge) {
            //     return edge - width
            // }

            return newValue;
        })
    }

    const leftClickHandler = () => {
        setTransition(prev => {
            const newValue = prev - stepWidth;

            if (newValue <= 0) {
                return 0;
            }
            return newValue;
        })
    }

    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner d-flex row"
                ref={containerRef}
                // style={{ transform: `translateX(-${transition}px)`, width: "max-content", transition: '1s ease-out', }}
                >
                {items.map((e, index) => {
                        if (index === 0) {
                            return (
                                <div className={`carousel-item active ${classes.carouselItem}`}>
                                    <InfoCard key={index} order='first' img={e} />
                                </div>
                            )
                        }
                        else {
                            if (index === items.length - 1)
                                return (
                                    <div className={`carousel-item ${classes.carouselItem}`}>
                                        <InfoCard key={index} order='last' img={e} />
                                    </div>
                                )
                            else {
                                return (
                                    <div className={`carousel-item ${classes.carouselItem}`}>
                                        <InfoCard key={index} img={e} />
                                    </div>
                                )
                            }
                        }
                    })}
            </div>
            <button onClick={leftClickHandler} className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button onClick={rightClickHandler} className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div >
    )
}

export default NewSlider;