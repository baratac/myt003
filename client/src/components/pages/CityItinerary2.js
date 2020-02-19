import React, { Component } from 'react'
//import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getItActivities } from "../../store/actions/itinerariesActions"
import ItineraryBox from "../layouts/Itinerary"
import CitySlide from "../layouts/CitySlide";
import ActivityCarrousel from '../layouts/ActivityCarrousel'
import Comments from "../layouts/Comments"

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
            <div>
                <div className="flex flex-wrap w-full h-full sm:h-1/2 sm:mb-4">
                  <div className="flex flex-wrap h-full w-full sm:w-1/2 p-8 sm:p-2 items-center justify-center content-center sm:content-start">
                    <div className="w-full flex justify-center"> <CitySlide city={ city } /> </div>
                    <div className="w-full sm:h-2/10">
                        <ItineraryBox item={itinerary} isOpen={true} deviceType={ this.props.deviceType } cityId={this.props.cityId} activities={this.props.activities || []}/>
                    </div>
                  </div>
                  <div className="hidden sm:block flex flex-wrap h-full sm:h-1/2 w-full sm:w-1/2 p-8 sm:p-2 sm:-mr-2 sm:border sm:border-gray-400 items-center justify-center overflow-scroll">
                      <Comments itId={ itinerary._id } />
                  </div>
                </div>
                <div className="border-t-2 border-dashed border-indigo-600">
                  <ActivityCarrousel deviceType={ this.props.deviceType } activities={this.props.activities || []}/>
                </div>
                <div className="sm:hidden flex flex-wrap h-full sm:h-1/2 w-full sm:w-1/2 p-8 sm:p-2 sm:-mr-2 sm:border sm:border-gray-400 items-center justify-center overflow-scroll">
                      <Comments itId={ itinerary._id } />
                 </div>
            </div>

          )
      }
    }
   
}

/*

                <Link
                  className="relative inline-block text-center underline text-blue-700 mt-4 cursor-pointer z-index-20" 
                  to={"/city/" + this.props.cityId}
                >
                  Go Back
                </Link>
*/
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
