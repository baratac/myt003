import React from 'react'
import { Link } from 'react-router-dom'
//import SlideItem from './SlideItem'


export default function SlideArea(props) {
        // console.log('SLIDE AREA:', this.props.theTab)
    return props.theTab.map((item) => (
        <Link to={"/city/" + item._id} key={item._id} className="block h-32 w-5/12 lg:h-full lg:w-1/4 lg:mb-4 m-1">
          <div className="text-white m-1 text-center w-full h-full m-1 shadow-lg border border-gray-700 rounded-lg border-box">
            <img src={ item.img } className="h-full w-full object-fit" alt="City Favorite"/>
          </div>
        </Link>

    ));
}

/*
        <SlideItem 
          key = { item._id } 
          id  = { item._id } 
          city = { item.name }
          image = { item.img } 
        />
*/