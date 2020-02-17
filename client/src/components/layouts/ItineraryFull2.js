import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import Comments from "./Comments"
import "react-multi-carousel/lib/styles.css";
import ItineraryBox from './Itinerary'
import ActivityItem from './ActivityItem'
import './layout.css'

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 30
    },
  };

function ItineraryFull (props) {
    const [isMoving, setMove] = useState(false);

    function bChange(nextSlide, { currentSlide, onMove }) {
        console.log("Before change", nextSlide, currentSlide, onMove);
        setMove(true);
    }

    function aChange(previousSlide, { currentSlide, onMove }) {
        setMove(false);
        console.log("After change", previousSlide, currentSlide, onMove);
    }

    function activityClick(e) {
        if (isMoving) {
            e.preventDefault();
        }
        // To remove after creation of activity page
        e.preventDefault();
    }
 
    let theList = props.activities.map((item) => (<ActivityItem item={item} key = { item._id } />))
    // console.log("THE LIST:", theList);

    return (
        <div className="flex flex-wrap h-full w-full">
            <ItineraryBox item={ props.item } isOpen={ true } />
            <div className=" relative w-full mt-2 ">
                { theList.length > 0 ? 
                    <Carousel 
                        beforeChange={bChange}
                        afterChange={aChange}
                        swipeable={true}
                        centerMode={true}
                        draggable={true}
                        showDots={false}
                        responsive={responsive}
                        ssr={true}
                        infinite={true}
                        keyBoardControl={true}
                        customTransition="transform 500ms ease-in-out"
                        autoPlay={false}
                        autoPlaySpeed={5000}
                        transitionDuration={2500}
                        containerClass="-mx-8 max-w-6xl border border-black"
                        removeArrowOnDeviceType={ ['tablet', 'mobile'] }
                        deviceType={props.deviceType}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >  
                        {
                            props.activities.map((item) => 
                            (<Link key = { item._id } 
                                to={"/activity/" + item._id}
                                onClick={activityClick}
                                className="relative block ml-1 p-2 h-24 sm:h-40 border border-gray-300 "
                            >
                                <img src={ item.img } className="h-full w-full object-fit shadow-xl" alt="City Favorite"/>
                                <div class="absolute mx-4 inset-x-0 bottom-0 h-5 pb-2 rounded opacity-1 bg-gray-700 text-white">
                                    {item.name}
                                </div>
                            </Link>
                            )) }
                    </Carousel>
                    : null}
                <Comments itId={ props.item._id } />
            </div>
        </div>
    
    
    );
    
}
/* itemClass="carousel-item-padding-40-px" */

export default ItineraryFull

/*

                { theList.length > 0 ? 
                    <Carousel
                        additionalTransfrom={0}
                        arrows={true}
                        autoPlaySpeed={3000}
                        centerMode={true}
                        className=""
                        containerClass="slide-container"
                        dotListClass=""
                        draggable
                        ssr={false}
                        focusOnSelect={false}
                        infinite
                        itemClass="activity-slide"
                        keyBoardControl
                        minimumTouchDrag={80}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        partialVisible={false}
                        responsive={{
                            desktop: {
                                    breakpoint: {
                                    max: 3000,
                                    min: 1024
                                },
                                items: 1,
                                partialVisibilityGutter: 40
                            },
                            mobile: {
                                breakpoint: {
                                    max: 464,
                                    min: 0
                                },
                                items: 2,
                                partialVisibilityGutter: 30
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464
                                },
                                items: 1,
                                partialVisibilityGutter: 30
                            }
                        }}
                        deviceType = 'mobile'
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                    {theList}
                    </Carousel>
                : null}
                <Comments itId={ props.item._id } />

                */