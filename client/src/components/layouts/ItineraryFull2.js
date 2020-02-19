import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Comments from "./Comments"

import ItineraryBox from './Itinerary'
import ActivityCarrousel from './ActivityCarrousel'
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

    // console.log("THE LIST:", theList);

    return (
        <div className="flex flex-wrap h-full w-full">
            <ItineraryBox item={ props.item } isOpen={ true } />
            <div className=" relative w-full h-full mt-2 sm:hidden">
                <ActivityCarrousel deviceType={ props.deviceType } activities={props.activities} />
                <Comments itId={ props.item._id } />
                <Link
                    className="relative inline-block text-center underline text-blue-700 mt-4 cursor-pointer z-index-20" 
                    to={"/city/" + props.cityId}
                >
                    Go Back
                </Link>
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