import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

export default function CitySlides(props) {

    console.log("City Slides: ", props.deviceType);

    return (
        <div>
            <Carousel 
                swipeable={true}
                centerMode={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={true}
                infinite={true}
                keyBoardControl={true}
                customTransition="transform 500ms ease-in-out"
                autoPlay={true}
                autoPlaySpeed={5000}
                transitionDuration={2500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={ ['tablet', 'mobile'] }
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px">
                    { props.cities.map((city) => 
                    (<div key={city._id} 
                        className="h-24 sm:h-40 mb-2 mx-1 border border-gray-300 "> 
                        <img className="h-full w-full object-cover shadow-xl" src={city.img} alt="city"/>
                    </div>)) }
            </Carousel>                    
        </div>
    )
}
