import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import SlideArea from '../layouts/SlideArea'
import PropTypes from 'prop-types'
import './pages.css'

export class LandingPage extends Component {

    render() {
        // console.log(this.props);
        return (
        <div >
        <div style={{backgroundColor: '#fff'}}>
            <Image src={require("../../assets/MYtineraryLogo.png")} style={ imgStyle } />
          </div>
          <div className="cities-area d-flex justify-content-center align-content-center">
             <Link to="/city-list" className="d-block text-decoration-none">
                <h6 
                  className="d-block p-2 text-decoration-none" style={{color: '#1A202C'}}
                >
                  Find your perfect trip, designed by insiders who know and love their cities
                </h6>
                <img src={require("../../assets/circled-right-2.png")} alt="Cities" style={ cityLink } className="mt-1 mx-auto"/>
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
  width: '160px',
  height: '160px',
  display: 'block',
} 

const imgStyle = {
  marginLeft: '-5px',
  width: '320px',
  height: '100px'
}