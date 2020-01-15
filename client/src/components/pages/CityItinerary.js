import React, { Component } from 'react'
//import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getItActivities } from "../../store/actions/itinerariesActions"
import ItineraryBox from "../layouts/ItineraryFull"

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
      const city = this.props.sites.filter( item => item._id === this.props.cityId )[0]
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
             <div className="d-flex justify-content-center align-content-center" style={ {width: '100%', height:'100%'} }>
               <Card>
                 <Card.Img variant="top" src= { city.img } style={ {width: '100%', height:'25%'} }/>
                 <Card.ImgOverlay>
                   <Card.Title style={ {backgroundColor: 'white', opacity: '0.7'}}>{ city.name }</Card.Title>
                 </Card.ImgOverlay>
                 <Card.Body>
                   <ItineraryBox item={itinerary} activities={this.props.activities || []}/>
                 </Card.Body>
                 <Card.Footer>
                       <Link to={"/city/" + this.props.cityId} style={backButton}>Go Back</Link>
                 </Card.Footer>
               </Card>
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
