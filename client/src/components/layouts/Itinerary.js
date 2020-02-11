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
        <div className="relative w-full h-20 block border rounded mx-4 mt-4">
            <div className="flex flex-wrap bg-gray-200 rounded-lg shadow-lg">
                <div className="w-1/4 h-20 border border-gray-200 grid-cols-3 p-2 mx-auto">
                    <div className="flex flex-col justify-center shadow-xl">
                        <img src={ profileData.pic } className="img-it block mx-auto" alt="User Pic" />
                        <small className="mx-auto text-gray-600 truncate">{ profileData.name }</small>
                    </div>
                </div>
                <div className="relative w-3/4 pl-2 text-left h-20 border-2 overflow-scroll">
                    <button
                        onClick={ toogleLike }
                        className="btn-like"
                    >
                        { likeImage() }
                    </button>
                    
                    <Link to={"/itinerary/" + props.item._id}>
                        <div className="btn-plus">
                            <img className="img-plus" src={require("../../assets/plus-6-64.png")} alt="Like Flag unset" />
                        </div>
                    </Link>

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
    );
    
}

export default ItineraryBox
