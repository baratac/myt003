import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { fetchFavorites } from '../../store/actions/usersActions';
import { getItineraries } from "../../store/actions/itinerariesActions"

import './layout.css'


function ItineraryBox (props) {
    const [likeFlag, setLike ] = useState(true);
    const [profileData, setProfileData] = useState({name: 'Anonimous', pic: require("../../assets/user-blue-02.png")});
    const favorites = useSelector(state => state.users.favorites);
    
    const dispatch = useDispatch();

    useEffect(() => {
        const likeStatus = (favorites.find(item => item.itineraryId === props.item._id) !== undefined);
        // console.log('LIKE STATUS:', likeStatus);
        setLike(likeStatus);
        // console.log('Current User', currentUser);
        const pData =({name: 'Anonimous', pic: require("../../assets/user-blue-02.png")});
        if (props.item.profilePic !== undefined && props.item.profilePic.length > 0) {
            pData.pic = props.item.profilePic;
        }
        if (props.item.profileName !== undefined && props.item.profileName.length > 0) {
            pData.name = props.item.profileName;
        }
        setProfileData(pData);
    }, [favorites, props.item._id, props.item.profilePic, props.item.profileName])

    let x = 1;
    let priceTag = props.item.price;

    async function toogleLike() {
        let data = {
            like: !likeFlag,
            itineraryId: props.item._id
        }
        await axios.put('/favorites', data);
        dispatch(fetchFavorites());
        data = {
            id: props.item._id,
            likes: (!likeFlag ? props.item.rating + 1 : props.item.rating - 1)
        }
        await axios.put('/itineraries/likes', data)
        dispatch( getItineraries(props.item.cityId) )
        // console.log('Toogle Like...');
    }
        
    function likeImage () {
        if (likeFlag) {
            return (<img className="img-like" src={require("../../assets/favorite-on-02.png")} alt="Like Flag set" />)
        }
        else {
            return (<img className="img-like" src={require("../../assets/favorite-off-02.png")} alt="Like Flag unset" />)
        }
    }

    // console.log('Itinerary Props:', props.item);
    if (!isNaN(Number(props.item.price))) {
        if (props.item.price < 100) {
            x = Math.ceil(props.item.price/20);
            } else {
                x = 5;
            }
            priceTag = '$'.repeat(x);
    }

    return (
        <div className="container city-link">
            <div className="row bg-indigo-100">
                <div className="profile-box col-3 px-2 mx-auto">
                    <div className="d-flex flex-column justify-content-center">
                        <img src={ profileData.pic } className="img-it mx-auto" alt="User Pic" />
                        <small className="mx-auto text-gray-600">{ profileData.name }</small>
                    </div>
                </div>
                <div className="col-9 text-left info-box">
                    <button
                        onClick={ toogleLike }
                        className="btn-like"
                    >
                        { likeImage() }
                    </button>
                    <div className="btn-plus">
                        <Link to={"/itinerary/" + props.item._id}>
                            <img className="img-plus" src={require("../../assets/plus-6-64.png")} alt="Like Flag unset" />
                        </Link>
                    </div>
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

        </div>
    );
    
}

export default ItineraryBox
