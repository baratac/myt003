import React, { useState, useEffect } from 'react'
import CityEntry from '../layouts/CityEntry'
import PropTypes from 'prop-types'
import './pages.css'

function CitiesPage(props) {
    const [cityList, setCityList] = useState([])
    const [srchCity, setSrchCity] = useState('')

    useEffect(() => {
        console.log("THE LIST:", props.theList)
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
        <div className="city-list">
            <input 
              type="text" 
              name="citySearch"
              placeholder="Search City"
              value={srchCity}
              onChange={updateCityList}/>
             {cityList.map((item) => (<CityEntry item={item} key = { item._id } />))}
        </div>
    )
}
CitiesPage.propTypes = {
    theList: PropTypes.array.isRequired
  }
export default CitiesPage;