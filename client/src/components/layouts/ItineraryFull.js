import React  from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ActivityItem from './ActivityItem'
import './layout.css'

function ItineraryFull (props) {
        //console.log(props.activities.length)
    let x = 1;
    let priceTag = props.item.price;

    if (!isNaN(Number(props.item.price))) {
        if (props.item.price < 100) {
            x = Math.ceil(props.item.price/20);
        } else {
            x = 5;
        }
        priceTag = '$'.repeat(x);
    }

    let theList = props.activities.map((item) => (<ActivityItem item={item} key = { item._id } />))
    return (
        <div className="container" style={cityLink}>
            <div className="row">
                <div className="col-3" style={profileBox}>

                </div>
                <div className="col-9 text-left" style={infoBox}>
                    <div>
                        {props.item.title}  
                    </div>
                    <div className="row">
                        <div className="col small">
                            Likes: { props.item.rating }
                        </div>
                        <div className="col small">
                            { props.item.duration }
                        </div>
                        <div className="col small">
                            { priceTag }
                        </div>
                    </div>
                    <div>
                        {props.item.hashTags.map((tag, idx) => (<small key={idx}>#{tag} </small>))}
                    </div>
                </div>
            </div>
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
        </div>
    );
    
}


const cityLink = {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'block',
    border: '1px solid black',
    margin: '2px'
  }
  const profileBox = {
      width: '100%',
      height: '80px',
      backgroundColor: 'blue'
  }
  const infoBox = {
    height: '80px',
    backgroundColor: 'red'
}

export default ItineraryFull
