import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Collapse } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { signOut } from '../../store/actions/usersActions'
import PropTypes from 'prop-types'
import './layout.css'


export class TopMenu extends Component {
    state = {
        openUserMenu: false,
        openMainMenu: false,
        redirect: false,
        redirectPath: ''
    }

    userMenu = () => {
      this.setState({
        openUserMenu: !this.state.openUserMenu
      })
    }

    mainMenu = () => {
        this.setState({
          openMainMenu: !this.state.openMainMenu
        })
      }
    
    renderRedirect = () => {
        if (this.state.redirect) {

              return <Redirect to={ this.state.redirectPath } />
            }
        

    }
  
    menuOption = (ev) => {
        const closeIt = false;
//        let history = useHistory();

        console.log(ev.target);
        
        if (ev.target.id === 'login-btn') {
            //history.push("/login");
            this.setState({
                redirectPath: "/login",
                redirect: true
            });
        } else if (ev.target.id === 'create-btn') {
          //history.push("/create-account");
          this.setState({
            redirectPath: "/create-account",
            redirect: true
          });
        } else {
          this.props.signOut();
          this.setState({
            redirectPath: "/",
            redirect: true
          });
        }
        this.setState({
            openUserMenu: closeIt
          })
    }

    menuShow = () => {
      // console.log('Session Status:', this.props.sessionActive)
      if (this.props.sessionActive) {
        return (
          <div>
              <p>USER: { this.props.currentUser.name }</p>
              <p>EMAIL: { this.props.currentUser.email }</p>
              <button 
                id="logout-btn"
                className="user-menu btn mt-2"
                onClick={ this.menuOption }
              >
                LogOUT
              </button>
          </div>
        );
      } else {
        return (
          <div>
              <button 
                id="login-btn"
                className="user-menu btn mt-2"
                onClick={ this.menuOption }
              >
                Login
              </button>
              <button 
                id="create-btn"
                className="user-menu btn mt-2"
                onClick={ this.menuOption }
              >
                Create Account
              </button>
          </div>
        );
      }
    }

    userPicture = () => {
      if (this.props.sessionActive) {
        if (this.props.currentUser.img) {
          return (<img style={imgUserIn} src={this.props.currentUser.img} alt="User" />)
        } else {
          return (<img style={imgUserIn} src={require("../../assets/user-blue-02.png")} alt="User" />);
        }
      } else {
         return (<img style={imgUserOut} src={require("../../assets/user-red-02.png")} alt="User" />);
      }                 
    }

    render() {
        return (
            <div >
                {this.renderRedirect()}
                <div className="flex mb-2">
                    <div className="w-2/12 bg-gray-100 h-12">
                      <button
                          onClick={ this.userMenu  }
                          className="mx-auto"
                          style={btnStyle}
                          data-target="#usermenu"
                          data-toggle="collapse"
                      >
                        { this.userPicture() }
                      </button>
                    </div>
                   <div className="w-8/12 bg-gray-100 h-12 object-cover overflow-hidden">
                      {this.props.homePageActive ? null : <img className="w-4/5 h-12 mx-auto" src={require("../../assets/MYtineraryLogo.png")} alt="Logo"/> }
                   </div>
                    <div className="w-2/12 bg-gray-100 h-12">
                      <a className="block mt-2" href="/menu">
                        <img style={ imgMenu }  src={require("../../assets/menu-blue-64.png")} alt="Menu" />
                      </a>
                    </div>
                </div>
                <Collapse in={ this.state.openUserMenu } timeout={ 1500 }>
                  <div id="usermenu" onChange={ this.collapseState } className="collapse mt-2">
                    { this.menuShow() }
                  </div>
                </Collapse>
            </div>
        )
    }
}

TopMenu.propTypes = {
  currentUser: PropTypes.object.isRequired,
  sessionActive: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  sessionActive: state.users.sessionActive,
  homePageActive: state.navigation.splashPageActive
})


const imgUserIn = {
    width: '45px',
    height: '45px',
    overflow: 'hidden',
    border: '1.5px solid blue',
    borderRadius: '50%',
    backgroundColor: 'transparent'
}

const imgUserOut = {
  width: '45px',
  height: '45px',
  overflow: 'hidden',
  border: '1.5px solid red',
  borderRadius: '50%',
  backgroundColor: 'transparent'
}


const imgMenu = {
    width: '35px',
    height: '35px',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    cursor: 'pointer'
}

const btnStyle = {
    width: '50px',
    height: '50px',
    background: 'transparent',
    border: 'none', //'1px solid grey',
    padding: '2px 2px',
    borderRadius: '40%',
    cursor: 'pointer'
  };


export default connect(mapStateToProps, { signOut })(TopMenu);
