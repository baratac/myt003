import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getItineraries } from "../../store/actions/itinerariesActions"
import ItineraryBox from "../layouts/Itinerary"

import PropTypes from 'prop-types'


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
                <div className="flex flex-wrap">
                    {itis.map((item) => (<ItineraryBox item={item} key = { item._id } />))}
                </div>
                <Link
                    className="relative inline-block text-center underline text-blue-700 mt-4 cursor-pointer z-index-20" 
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
