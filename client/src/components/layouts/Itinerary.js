import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { fetchFavorites } from '../../store/actions/usersActions';
import { getItineraries } from "../../store/actions/itinerariesActions"

import './layout.css'


function ItineraryBox (props) {
    const [likeFlag, setLike ] = useState(true);
    const favorites = useSelector(state => state.users.favorites);
    
    const dispatch = useDispatch();

    useEffect(() => {
        const likeStatus = (favorites.find(item => item.itineraryId === props.item._id) !== undefined);
        // console.log('LIKE STATUS:', likeStatus);
        setLike(likeStatus);
        // console.log('Current User', currentUser);
    }, [favorites, props.item._id])

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
        <div className="container" style={cityLink}>
            <div className="row">
                <div className="col-3" style={profileBox}>

                </div>
                <div className="col-9 text-left info-box">
                    <button
                        onClick={ toogleLike }
                        //onMouseOver = { () => this.userMenu() }
                        className="btn-like"
                    >
                        { likeImage() }
                    </button>
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
                <div style={itButton}>
                    <Link to={"/itinerary/" + props.item._id}>v View All v</Link>
                </div>
            </div>

        </div>
    );
    
}


const cityLink = {
    position: 'relative',
    width: '100%',
    height: '110px',
    display: 'block',
    border: '1px solid black',
    margin: '2px'
  }
  const profileBox = {
      width: '100%',
      height: '80px',
      backgroundColor: 'blue'
  }

const itButton = {
    backgroundColor: '#555555',
    width: '100%',
    border: 'none',
    color: 'white',
    padding: '4px 4px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    boxSizing: 'border-box',
    //margin: '4px 2px',
    cursor: 'pointer'
  }
export default ItineraryBox
