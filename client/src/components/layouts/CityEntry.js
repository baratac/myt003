import React from 'react'
import { Link } from 'react-router-dom'
import './layout.css'

function CityEntry(props) {
    //console.log('city entry: ', props.item)
    return (
        <div className="city-entry mt-2">
            <Link to={"/city-list/" + props.item._id} className="d-block">
                <p className="centered city-entry-text px-2">{props.item.name}</p>
                <img className="city-entry-img" src={props.item.img} alt="City"/>
            </Link>
        </div>
    )
}

export default CityEntry;