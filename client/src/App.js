import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
// import Sites from './components/SiteList'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Cities from './components/pages/CitiesPage'
import CreateAccount from './components/pages/CreateAcountPage'
import Home from './components/pages/LandingPage'
import Login from './components/pages/LoginPage'
import Menu from './components/pages/MenuPage'
import theList from './components/CityList'

let TestFooter = withRouter(Footer);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sites: theList,
      currentPage: 1,
      currentView: theList.slice(0, 4)
    };
  }

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
    console.log('UP SLIDE OPT', data, ev.target.id);
    //console.log(this.state.currentView);
    
    let newPage = this.state.currentPage;
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
    const newView = this.state.sites.slice(start, start + 4)
    // console.log('PAGE:', newPage, newView);
    // Alternative set state setup....
    /*
    this.setState((state) => {
      return { currentPage: newPage, currentView: newView }
    });
    */
    this.setState({
      currentPage: newPage,
      currentView: newView
    }) 
  }

  render () {
    return (
      <Router>
        <div className="App container" >
          <Header />
          <div className="main-area">
            <Route exact path="/">
              <Home favorites={ this.state.currentView }/>
            </Route>
            <Route path="/home/:id" component = { Home }></Route>
            <Route path="/city-list" component = { Cities }></Route>
            <Route exact path="/menu" component = { Menu }></Route>
            <Route exact path="/Login" component = { Login }></Route>
            <Route exact path="/create-account" component = { CreateAccount }></Route>
          </div>
          <TestFooter slideOpt={this.slideOption} />
        </div>
      </Router>
    );
  }
}

export default App;
/*
            <Sites 
              content = { this.state.sites } 
              toggleLikes = { this.toggleLikes }
              delSite = { this.delSite } />
*/