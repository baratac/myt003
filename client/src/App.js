import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter, Redirect} from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import JavascriptTimeAgo from 'javascript-time-ago'
 
// The desired locales.
import en from 'javascript-time-ago/locale/en'
import pt from 'javascript-time-ago/locale/pt'
 

import { connect } from 'react-redux'
import { fetchCities, updateView } from './store/actions/citiesActions';
import { signIn, fetchFavorites } from './store/actions/usersActions';

// Import Tailwind CSS Library
import './css/tailwind.css';
// import Sites from './components/SiteList'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Cities from './components/pages/CitiesPage'
import CreateAccount from './components/pages/CreateAcountPage'
import Home from './components/pages/LandingPage'
import Login from './components/pages/LoginPage'
import Menu from './components/pages/MenuPage'
import City from './components/pages/City'
import CityItinerary from './components/pages/CityItinerary'

// Initialize the desired locales.
JavascriptTimeAgo.locale(en)
JavascriptTimeAgo.locale(pt)

let TestFooter = withRouter(Footer);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        reloading: true
    };
  }

  slideOption =  (data, ev) => {
    //console.log('UP SLIDE OPT', data, ev.target.id);
    //console.log(this.state.currentView);
    
    let newPage = this.props.currentPage;
    if (isNaN(data)) {
      if (data === 'left') { // Scroll Left
        newPage--;
        newPage = newPage === 0 ? 3 : newPage;
      } else if (data === 'right') {
        newPage++;
        newPage = newPage > 3 ? 1 : newPage;
      }
    } else {
      if (data > 0 && data <=3 ) {
        newPage = data;
      }
    }
    const start = (newPage - 1) * 4;
    const newView = this.props.sites.slice(start, start + 4)
    // console.log('PAGE:', newPage, newView);
    // Alternative set state setup....
    /*
    this.setState((state) => {
      return { currentPage: newPage, currentView: newView }
    });
    */
   this.props.updateView({
    currentPage: newPage,
    currentView: newView
    });
  }

  render () {
    console.log('APp Component Rendering...');

    return (
      <Router>
        { this.state.reloading ? <Redirect to="/" /> : 
          <div className="App container main-container" >
            <Header />
            <div className="main-area">
              <Route exact path="/">
                <Home favorites={ this.props.currentView }/>
              </Route>
              <Route path="/city/:id" component = { City }></Route>
              <Route path="/itinerary/:id" component = { CityItinerary }></Route>
              <Route path="/city-list">
                <Cities theList={ this.props.sites } />
              </Route>
              <Route exact path="/menu" component = { Menu }></Route>
              <Route exact path="/Login" component = { Login }></Route>
              <Route exact path="/create-account" component = { CreateAccount }></Route>
            </div>
            <TestFooter slideOpt={this.slideOption} />
          </div>}
      </Router>
    );
  }

  componentDidMount() {
    console.log("App component will mount...");
    this.setState({reloading: false});
    sessionStorage.reload = true;
    // axios.defaults.baseURL = 'http://localhost:5000';//'https://myt-cab2165.herokuapp.com'; // 'http://localhost:5000';
    this.props.fetchCities();
    const userToken = localStorage.getItem('userToken');
    if (userToken != null) {
        this.props.signIn({token: userToken}).then(
          res => {
            this.props.fetchFavorites();
          }
        );
    }
    // console.log('Token is:', userToken)
  }
}

App.propTypes = {
  fetchCities: PropTypes.func.isRequired,
  fetchFavorites: PropTypes.func.isRequired,
  updateView: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  cities: PropTypes.object
}

const mapStateToProps = state => ({
  sites: state.cities.sites,
  currentPage: state.cities.currentPage,
  currentView: state.cities.currentView
})

export default connect(mapStateToProps, { fetchCities, fetchFavorites, updateView, signIn })(App);
/*
            <Sites 
              content = { this.state.sites } 
              toggleLikes = { this.toggleLikes }
              delSite = { this.delSite } />
*/