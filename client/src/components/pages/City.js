import React from 'react'
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card'


function City({ match }) {
    
    const city = useSelector( state => state.cities.sites.filter( item => item._id === match.params.id ) )[0]

    // const city = useSelector( state => state.cities.sites )
    // console.log('City Page: ', city)
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
            <Card.Img variant="top" src= { city.img } />
            <Card.Body>
                <Card.Title>{ city.name }</Card.Title>
                <Card.Text>
                    CITY DESCRIPTION
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">{ city.country }</small>
            </Card.Footer>
          </Card>
        </div>
     )
   }
}

export default City;
