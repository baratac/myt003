import React from 'react'
import { Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './layout.css'

function ActivityItem(props) {
    // console.log('IMAGE:', "./assets/" + props.item.img )
    return (

        <div className="h-24 sm:h-40 mb-2 mx-1 border border-gray-300 ">
            <img src={ props.item.img } className="h-full w-full object-cover shadow-xl" alt="City Favorite"/>
        </div>

    )
    
}

ActivityItem.propTypes = {
    item: PropTypes.object.isRequired
}


const cityLink = {
    width: '100%',
    height: '80px',
    display: 'block',
  } 
export default ActivityItem

/*

        <Card className="bg-dark text-white m-2 text-center">
            <Card.Img src={ props.item.img } style={ cityLink } alt="Activity" />
            <Card.ImgOverlay>
                <Card.Title 
                    className="small align-self-center bg-dark"
                    style={ {opacity: '0.5'}}
                >
                    {props.item.name}
                </Card.Title>
            </Card.ImgOverlay>
        </Card>
*/
