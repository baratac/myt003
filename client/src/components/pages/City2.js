import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getItineraries } from "../../store/actions/itinerariesActions"
import ItineraryBox from "../layouts/Itinerary"
import CitySlide from "../layouts/CitySlide"
import "./pagesDesign.css"




class City extends Component  {
    
 
    componentDidMount () {
      this.props.getItineraries(this.props.match.params.id)
    }
 
    render () {
      const city = this.props.sites.filter( item => item._id === this.props.match.params.id )[0]
      const itis = this.props.itineraries
 
      if (city === undefined ) {
        return (
          <div>
              <h1> NO YET </h1>
          </div>
        )
      } else {
          return (
            <div>
              <div className="flex flex-row sm:flex-col flex-wrap h-full w-full p-8 items-center sm:items-start justify-center ">
                  <div>
                    <CitySlide city={city} />
                  </div>
                  <div className="h-full w-full flex flex-wrap sm:items-center sm:justify-around ">
                    {itis.map((item) => (<ItineraryBox item={item} isOpen={ false }key = { item._id } />))}
                  </div>
              </div>
              <Link
                    className="block text-center underline text-blue-700 mt-4 cursor-pointer z-index-20" 
                    to="/city-list"
                >
                    Choose Another City
              </Link>
            </div>
          )
      }
    }
   
}

City.propTypes = {
  sites: PropTypes.array,
  getItineraries: PropTypes.func.isRequired,
  itineraries: PropTypes.array
}

const mapStateToProps = state => ({
  sites: state.cities.sites,
  itineraries: state.itineraries.itList
})


const backButton = {
  position: 'relative',
  textAlign: 'center',
  textDecoration: 'underline',
  display: 'inline-block',
  color: 'blue',
  cursor: 'pointer',
  zIndex: '1000'
}
export default connect(mapStateToProps, { getItineraries })(City);
