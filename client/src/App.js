import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { fetchCities, updateView } from './store/actions/citiesActions'

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


let TestFooter = withRouter(Footer);

class App extends Component {


 toggleLikes = (id) => {
    this.setState(
      {
        sites: this.state.sites.map((item) => {
                    if (id === item.id) {
                      item.like = !item.like;
                    }
                    return item;
                  })
      }
    );
    // console.log('ID:', id);
  }

  delSite = (id) => {
    this.setState(
      {
        sites: this.state.sites.filter((item) => id !== item.id)
      }
    );
    //console.log('DEL ID:', id);
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
    return (
      <Router>
        <div className="App container" >
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
        </div>
      </Router>
    );
  }
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
      this.props.fetchCities();
  }
}

App.propTypes = {
  fetchCities: PropTypes.func.isRequired,
  updateView: PropTypes.func.isRequired,
  cities: PropTypes.object
}

const mapStateToProps = state => ({
  sites: state.cities.sites,
  currentPage: state.cities.currentPage,
  currentView: state.cities.currentView
})

export default connect(mapStateToProps, { fetchCities, updateView })(App);
/*
            <Sites 
              content = { this.state.sites } 
              toggleLikes = { this.toggleLikes }
              delSite = { this.delSite } />
*/