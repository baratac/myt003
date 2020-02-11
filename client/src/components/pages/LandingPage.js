import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SlideArea from '../layouts/SlideArea'
import CitySlides from '../layouts/CitySlides'
import PropTypes from 'prop-types'
import { enterHome, exitHome } from '../../store/actions/navActions';
import './pages.css'

export class LandingPage extends Component {

    render() {
        // console.log(this.props);
        return (
        <div >
          <CitySlides cities={ this.props.cities } deviceType={ this.props.deviceType } />
          <div className="flex justify-center content-center border-t-2 border-b-2 border-gray-900 border-dashed">
             <Link to="/city-list" className="block text-decoration-none">
                <p 
                  className="block p-2 text-lg subpixel-antialiased font-medium tracking-wide text-gray-800 leading-relaxed"
                >
                  Find your perfect trip, designed by insiders who know and love their cities
                </p>
                <img src={require("../../assets/circled-right-2.png")} alt="Cities" className="block w-32 h-32 mt-1 mb-2 mx-auto"/>
            </Link>
          </div>
          <div style={{height: "18rem"}}className="relative flex flex-wrap sm:flex-no-wrap justify-center content-center overflow-scroll mt-1 mb-0 mx-auto lg:px-4 sm:px-2 sm:py-12 lg:py-16 lg:pt-0">
             <SlideArea theTab={ this.props.favorites } />
          </div>
        </div>
    )
  }
  componentDidMount() {
    console.log('Enter Home')
    this.props.enterHome();
  }
  componentWillUnmount() {
    this.props.exitHome('Exit Home...');
  }
}

LandingPage.propTypes = {
    favorites: PropTypes.array.isRequired,
    enterHome: PropTypes.func,
    exitHome: PropTypes.func
  }

  const mapStateToProps = state => ({
    cities: state.cities.sites,
  })

export default connect(mapStateToProps, {enterHome, exitHome})(LandingPage);
