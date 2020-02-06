import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import Comments from "./Comments"
import "react-multi-carousel/lib/styles.css";
//import ItineraryBox from './Itinerary'
import ActivityItem from './ActivityItem'
import './layout.css'

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
    return (
        <div className="container">
            <div className="row bg-indigo-100">
                <div className="profile-box col-3 px-2 mx-auto">
                    <div className="d-flex flex-column justify-content-center">
                        <img src={ profileData.pic } className="img-it mx-auto" alt="User Pic" />
                        <small className="mx-auto text-gray-600">{ profileData.name }</small>
                    </div>
                </div>
                <div className="col-9 text-left info-box">
                    <div className="flex-col flex-wrap content-end h-full">
                        <div className="mt-2 mb-1 text-gray-800"> 
                            {props.item.title}  
                        </div>
                        <div>
                            <div className="row text-gray-500">
                                <div className="col small">
                                    Likes: { props.item.rating }
                                </div>
                                <div className="col small">
                                    { props.item.duration }
                                </div>
                                <div className="col small">
                                        Cost: { priceTag }
                                </div>
                            </div>
                        </div>
                        {props.item.hashTags.length > 0 ? 
                            (<div>
                                {props.item.hashTags.map((tag, idx) => (<small key={idx}>#{tag} </small>))}
                            </div>) : null
                        }
                    </div>
                </div>
            </div>
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
           
        </div>
    );
    
}


export default ItineraryFull
