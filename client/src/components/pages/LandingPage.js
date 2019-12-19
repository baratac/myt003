import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import SlideArea from '../layouts/SlideArea'
import PropTypes from 'prop-types'

export class LandingPage extends Component {

    render() {
        // console.log(this.props);
        return (
        <div>
        <div style={{backgroundColor: '#fff'}}>
            <Image src="./assets/MYtineraryLogo.png" style={ imgStyle } />
          </div>
          <div className="cities-area d-flex justify-content-center align-content-center">
             <Link to="/city-list" className="d-block">
                <img src="./assets/circled-right-2.png" alt="Cities" style={ cityLink } className="mt-3"/>
            </Link>
          </div>
          <div className="slide-area">
             <SlideArea theTab={ this.props.favorites } />
          </div>
        </div>
    )
    }
}

LandingPage.propTypes = {
    favorites: PropTypes.array.isRequired
  }
export default LandingPage;

const cityLink = {
  width: '220px',
  height: '220px',
  display: 'block',
} 

const imgStyle = {
  marginLeft: '-5px',
  width: '320px',
  height: '100px'
}