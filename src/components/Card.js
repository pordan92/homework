import { Button, Card } from "react-bootstrap";

import 'bootstrap-icons/font/bootstrap-icons.css';
import { forwardRef, useEffect, useRef } from "react";

import classes from './Card.module.scss';

const InfoCard = forwardRef(({ img, order }, ref) => {

    let timeLineStyle = classes.timelineLineVertical

    if (order === 'first') {
        timeLineStyle = classes.timelineLineVerticalRight;
    }
    if (order === 'last') {
        timeLineStyle = classes.timelineLineVerticalLeft;
    }

    return (
                <div className="col">
                    <Card ref={ref} className={`${classes.cardShadow} p-3 rounded-4 h-100 mx-3 border border-0`} style={{ width: '20rem' }}>
                        <Card.Img
                            variant="top"
                            src={img}
                            alt="Building"
                            className="rounded-0"
                            style={{ height: '150px', objectFit: 'cover' }}
                        />
                        <Card.Body className="px-0 pb-0">
                            <Card.Title className="text-end fs-16 fw-medium">Fusce a magna pellentesque</Card.Title>
                            <Card.Text className="text-end text-muted fs-6 fw-normal mh-25">
                                Morbi feugiat nisi in felis maximus, vel sollicitudin dui commodo. Integer blandit non odio a congue. Maecenas in aliquet nisl. Integer maximus et.
                            </Card.Text>
                            <div className="d-flex justify-content-end">
                                <Button variant="link" className="d-flex align-items-center justify-content-center text-decoration-none fw-bold">
                                    <i className="bi bi-arrow-left px-2"></i>View More
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className={`${classes.timeline} mt-4`}>
                        <div className={classes.timelineLine}></div>
                        <div className={classes.timelineDate}>
                            <h6 className={"text-center"}>July</h6>
                            <h5 className={`text-center fw-bold`}>2025</h5>
                        </div>
                        <div className={timeLineStyle}></div>
                    </div>
                </div>
            )
        }
    )

export default InfoCard;