import React, { useState, useEffect } from 'react'
import CityEntry from '../layouts/CityEntry'
import PropTypes from 'prop-types'
import './pages.css'

function CitiesPage(props) {
    const [cityList, setCityList] = useState([])
    //const [srchCity, setSrchCity] = useState('')

    useEffect(() => {
        setCityList(props.theList)
    }, [props.theList]);

    //console.log('Cities List: ', elemList)
    return (
        <div className="city-list">
            
             {cityList.map((item) => (<CityEntry item={item} key = { item._id } />))}
        </div>
    )
}
CitiesPage.propTypes = {
    theList: PropTypes.array.isRequired
  }
export default CitiesPage;