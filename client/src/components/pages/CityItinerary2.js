import React, { Component } from 'react'
//import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getItActivities } from "../../store/actions/itinerariesActions"
import ItineraryBox from "../layouts/ItineraryFull2"

import Card from 'react-bootstrap/Card'
import PropTypes from 'prop-types'


class CityItinerary extends Component  {
    
    //const city = useSelector( state => state.cities.sites.filter( item => item._id === match.params.id ) )[0]

    componentDidMount () {
      this.props.getItActivities(this.props.match.params.id)
    }
    // const city = useSelector( state => state.cities.sites )
    // console.log('City Page: ', city)
    render () {
      const city = this.props.sites.filter( item => item._id === this.props.cityId )[0];
      const itinerary = this.props.itineraries.filter( item => item._id === this.props.match.params.id )[0]
      // console.log('CITY:', city);
      // console.log('Itinerary:', itinerary);
      // console.log('Activities:', this.props.activities)
      if (city === undefined ) {
        return (
          <div>
              <h1> NO YET </h1>
          </div>
        )
      } else {
          return (
             <div className="bg-gray-200 h-full p-8 items-center justify-center">
                 <div className="relative ">
                    <img 
                        className="w-full object-cover rounded shadow-md"
                        style={{ height: '25%' }}
                        src={ city.img } alt="City Pic"/>
                 </div>
                <div className="relative px-4">
                    <div className="bg-gray-100 h-12 p-3 -mt-4 flex content-center justify-center rounded shadow-lg">
                        <h4 className="text-blue-600 font-semibold text-lg leading-tight truncate">
                            { city.name }
                        </h4>
                    </div>
                </div>
                <div className="flex flex-wrap overflow-scroll h-full w-full bg-gray-200">
                    <ItineraryBox item={itinerary} deviceType={ this.props.deviceType } activities={this.props.activities || []}/>
                </div>
                <Link
                    className="relative inline-block text-center underline text-blue-700 mt-4 cursor-pointer z-index-20" 
                    to={"/city/" + this.props.cityId}
                >
                    Go Back
                </Link>
            </div>
          )
      }
    }
   
}

CityItinerary.propTypes = {
  sites: PropTypes.array,
  getItActivities: PropTypes.func.isRequired,
  activities: PropTypes.array,
  itineraries: PropTypes.array,
  cityId: PropTypes.string
}

const mapStateToProps = state => ({
  sites: state.cities.sites,
  cityId: state.itineraries.cityId,
  activities: state.itineraries.activityList,
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
export default connect(mapStateToProps, { getItActivities })(CityItinerary);
