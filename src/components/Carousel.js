import InfoCard from "./Card";

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
import { Button, Carousel } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import classes from './Carousel.module.scss';

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

const Slider = () => {
    const [transition, setTransition] = useState(0);
    const [leftEdge, setLeftEdge] = useState(false);
    const [rightEdge, setRightEdge] = useState(false);

    const [direction, setDirection] = useState(false);

    const isMobile = window.innerWidth < 900

    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);

    const containerRef = useRef();
    const sliderRef = useRef();
    const currentTranslate = useRef(0);
    const prevTranslate = useRef(0);

    let stepWidth = 0;


    const rightClickHandler = () => {
        setTransition(prev => {
            if (containerRef.current == null) {
                return transition
            }
            const newValue = prev + stepWidth;
            const edge = containerRef.current.scrollWidth;
            const width = containerRef.current.clientWidth;

            if (newValue + width >= edge) {
                return edge - width
            }

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
    
        const handleTouchStart = (e) => {

            const touchX = e.touches ? e.touches[0].clientX : e.clientX;
            
            setIsDragging(true);
            setStartPos(touchX);
            sliderRef.current.style.transition = "none";
        };
    
        const handleTouchMove = (e) => {
            if (!isDragging) return;
            const touchX = e.touches ? e.touches[0].clientX : e.clientX;
            const moveBy = touchX - startPos;
            console.log(moveBy)
            currentTranslate.current = prevTranslate.current + moveBy;
            sliderRef.current.style.transform = `translateX(-${currentTranslate}px)`;
        };
    
        const handleTouchEnd = () => {
            setIsDragging(false);
            prevTranslate.current = currentTranslate.current;
            sliderRef.current.style.transition = "transform 1s ease-out";
        };

        return (
            <>
            <div className="mb-5 mx-3">
                <Button className="border border-secondary text-secondary" disabled={!leftEdge} style={
                    {
                        padding: '0 1rem',
                        margin: '',
                        ['background-color']: 'transparent',
                        color: 'grey',
                    }
                }
                    onClick={leftClickHandler}
                ><i class="bi bi-arrow-left"></i></Button>
                <Button className="border border-secondary text-secondary" disabled={!rightEdge} style={
                    {
                        padding: '0 1rem',
                        margin: '0 0.5rem',
                        ['background-color']: 'transparent',
                        color: 'grey',
                    }
                }
                    onClick={rightClickHandler}
                ><i className="bi bi-arrow-right"></i></Button>
            </div>

            <div ref={containerRef} className="overflow-x-hidden position-relative">
                {leftEdge && <div className={`${classes.edge_left}`}></div>}
                <div ref={sliderRef}

                    onMouseUp={isMobile ? handleTouchEnd : null}
                    onMouseMove={isMobile && isDragging ? handleTouchMove : null}
                    onMouseDown={isMobile ? handleTouchStart : null}

                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}

                    className={`d-flex ${direction ? `flex-row-reverse, ${classes.rightStart}` : 'flex-row'} flex-nowrap`}
                    style={{ transform: `translateX(-${transition}px)`, width: "max-content", transition: '1s ease-out', }}>
                    {items.map((e, index) => {
                        if (index === 0) {
                            return (
                                <div>
                                    <InfoCard key={index} order='first' img={e} />
                                </div>
                            )
                        }
                        else {
                            if (index === items.length - 1)
                                return (
                                    <div>
                                        <InfoCard key={index} order='last' img={e} />
                                    </div>
                                )
                            else {
                                return (
                                    <div>
                                        <InfoCard key={index} img={e} />
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
                {rightEdge && <div className={`${classes.edge_right} ${classes.main}`}></div>}
            </div>
        </>
    )
}

export default Slider;