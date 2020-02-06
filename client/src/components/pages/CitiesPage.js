import React, { useState, useEffect } from 'react'
import CityEntry from '../layouts/CityEntry'
import PropTypes from 'prop-types'
import './pages.css'
//import '../../css/tailwind.css'

function CitiesPage(props) {
    const [cityList, setCityList] = useState([])
    const [srchCity, setSrchCity] = useState('')

    useEffect(() => {
        // console.log("THE LIST:", props.theList)
        setCityList(props.theList)
    }, [props.theList]);

    const updateCityList = (event) => {
      const srchString = event.target.value
      let newList = props.theList;

      setSrchCity(srchString)
      if (srchString.length > 0) {
          newList = props.theList.filter(item => {
          return item.name.toUpperCase().startsWith(srchString.toUpperCase())
        })
      }
      setCityList(newList)
      //console.log("SRCH: ", srchString, newList )
    }
    
    //console.log('Cities List: ', elemList)
    return (
      <div>
        <div>
          <p className="subpixel-antialiased text-xl tracking-wide text-center leading-relax">City List</p>
          <input 
              type="text"
              id="city-search"
              className="placeholder-indigo-200 border border-indigo-400 focus:border-indigo-600 rounded-lg w-100 mb-1"
              name="citySearch"
              placeholder="Search City"
              value={srchCity}
              onChange={updateCityList}/>
        </div>
        <div id="list-of-cities" className="relative m-1 border border-blue-800 city-list">
             {cityList.map((item) => (<CityEntry item={item} key = { item._id } />))}
        </div>
      </div>
    )
}
CitiesPage.propTypes = {
    theList: PropTypes.array.isRequired
  }
export default CitiesPage;