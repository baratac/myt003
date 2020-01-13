import React, { Component } from 'react'
//import { useSelector } from 'react-redux'

import { connect } from 'react-redux'
import { getItineraries } from "../../store/actions/itinerariesActions"
import ItineraryBox from "../layouts/Itinerary"

import Card from 'react-bootstrap/Card'
import PropTypes from 'prop-types'


class City extends Component  {
    
    //const city = useSelector( state => state.cities.sites.filter( item => item._id === match.params.id ) )[0]

    componentDidMount () {
      this.props.getItineraries(this.props.match.params.id)
    }
    // const city = useSelector( state => state.cities.sites )
    // console.log('City Page: ', city)
    render () {
      const city = this.props.sites.filter( item => item._id === this.props.match.params.id )[0]
      const itis = this.props.itineraries
      console.log('CITY:', city);
      console.log('ITINERARIES:', itis);
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
                   {itis.map((item) => (<ItineraryBox item={item} key = { item._id } />))}
                 </Card.Body>
                 <Card.Footer>
                     <small className="text-muted">{ city.country }</small>
                 </Card.Footer>
               </Card>
             </div>
          )
      }
    }
   
}

City.propTypes = {
  getItineraries: PropTypes.func.isRequired,
  itineraries: PropTypes.array
}

const mapStateToProps = state => ({
  sites: state.cities.sites,
  itineraries: state.itineraries.itList
})

export default connect(mapStateToProps, { getItineraries })(City);
