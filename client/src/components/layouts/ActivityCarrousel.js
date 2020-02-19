import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

function ActivityCarrousel(props) {
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
 
    // let theList = props.activities.map((item) => (<ActivityItem item={item} key = { item._id } />))
 
    return (
        <div>
            { props.activities.length > 0 ? 
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
                containerClass="-mx-8 max-w-6xl"
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
                        className="relative block ml-1 p-2 h-24 sm:h-40"
                    >
                        <img src={ item.img } className="h-full w-full object-fit rounded-lg shadow-xl" alt="City Favorite"/>
                        <div className="absolute mx-4 inset-x-0 bottom-0 h-5 pb-2 rounded opacity-1 bg-gray-700 text-white">
                            {item.name}
                        </div>
                    </Link>
                    )) }
            </Carousel>
            : null}           
        </div>
    )
}

export default  ActivityCarrousel;
