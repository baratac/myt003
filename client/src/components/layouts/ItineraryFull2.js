import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import Comments from "./Comments"
import "react-multi-carousel/lib/styles.css";
//import ItineraryBox from './Itinerary'
import ActivityItem from './ActivityItem'
import './layout.css'

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

function ItineraryFull (props) {
    const [profileData, setProfileData] = useState({name: 'Anonimous', pic: require("../../assets/user-blue-02.png")});

    useEffect(() => {
        const pData =({name: 'Anonimous', pic: require("../../assets/user-blue-02.png")});
        if (props.item.profilePic !== undefined && props.item.profilePic.length > 0) {
            pData.pic = props.item.profilePic;
        }
        if (props.item.profileName !== undefined && props.item.profileName.length > 0) {
            pData.name = props.item.profileName;
        }
        setProfileData(pData);
    }, [props.item._id, props.item.profilePic, props.item.profileName])

    console.log(props.item)
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
    console.log("THE LIST:", theList);
    return (
        <div>
        <div className="relative w-full h-20 block border rounded mx-4 mt-4">
            <div className="flex flex-wrap bg-gray-200 rounded-lg shadow-lg">
                <div className="w-1/4 h-20 border border-gray-200 grid-cols-3 p-2 mx-auto">
                    <div className="flex flex-col justify-center shadow-xl">
                        <img src={ profileData.pic } className="img-it block mx-auto" alt="User Pic" />
                        <small className="mx-auto text-gray-600 truncate">{ profileData.name }</small>
                    </div>
                </div>
                <div className="relative w-3/4 pl-2 text-left h-20 border-2 overflow-scroll">
                    <div className="flex-col flex-wrap content-end h-full">
                        <div className="mt-2 mb-1 text-gray-800 truncate"> 
                            {props.item.title}  
                        </div>
                        <div className="flex flex-wrap justify-around text-xs text-gray-600">
                            <div className="w-1/3">
                                Likes: { props.item.rating }
                            </div>
                            <div className="w-1/3">
                                { props.item.duration }
                            </div>
                            <div className="w-1/3">
                                    Cost: { priceTag }
                            </div>
                        </div>
                        {props.item.hashTags.length > 0 ? 
                            (<div>
                                {props.item.hashTags.map((tag, idx) => (<span className="text-xs text-blue-300" key={idx}>#{tag} </span>))}
                            </div>) : null
                        }
                    </div>
                </div>
            </div>
        </div>
        <div>
            { theList.length > 0 ? 
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
                    autoPlay={false}
                    autoPlaySpeed={5000}
                    transitionDuration={2500}
                    containerClass="slide-container"
                    removeArrowOnDeviceType={ ['tablet', 'mobile'] }
                    deviceType={props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="activity-slide"
                >  
                    {theList}
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