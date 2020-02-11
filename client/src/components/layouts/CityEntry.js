import React from 'react'
import { Link } from 'react-router-dom'
import './layout.css'

function CityEntry(props) {
    //console.log('city entry: ', props.item)
    return (
        <div className="relative w-full sm:w-5/12 lg:w-1/3 h-24 border-2 rounded border-gray-700 overflow-hidden mt-2 sm:mx-1 sm:mt-2">
            <Link to={"/city/" + props.item._id} className="block">
                <p className="centered city-entry-text px-2">{props.item.name}</p>
                <img className="city-entry-img" src={props.item.img} alt="City"/>
            </Link>
        </div>
    )
}

/*
<div className="relative w-full sm:w-1/3 lg:w-1/4 h-24 border-2 rounded border-gray-700 overflow-hidden mt-2 sm:mx-1 sm:mt-2">
                <p className="centered city-entry-text px-2">{props.item.name}</p>
               <img className="city-entry-img" src={props.item.img} alt="City"/>
*/
export default CityEntry;