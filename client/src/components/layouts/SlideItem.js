import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './layout.css'

export class SlideItem extends Component {
    render() {
        return (
             <Link to={"/city-list/" + this.props.id} className="d-block">
                <Card className="bg-dark text-white m-2 text-center">
                    <Card.Img src={ this.props.image } style={ cityLink } alt="City Favorite" />
                    <Card.ImgOverlay>
                        <Card.Title className="h6 align-self-center">{this.props.city}</Card.Title>
                    </Card.ImgOverlay>
                </Card>
            </Link>
        )
    }
}

SlideItem.propTypes = {
    city: PropTypes.string.isRequired,
    id: PropTypes.string,
    image: PropTypes.string
}


const cityLink = {
    width: '160px',
    height: '120px',
    display: 'block',
  } 
export default SlideItem
