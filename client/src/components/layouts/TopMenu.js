import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Collapse } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
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
      console.log('Session Status:', this.props.sessionActive)
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


    render() {
        return (
            <div >
                {this.renderRedirect()}
                <div className="top-menu">
                    <button
                        onClick={ this.userMenu  }
                        //onMouseOver = { () => this.userMenu() }
                        style={btnStyle}
                        data-target="#usermenu"
                        data-toggle="collapse"
                    >
                      { this.props.sessionActive ? 
                        (<img style={imgUserIn} src={require("../../assets/user-blue-02.png")} alt="User" />) :
                        <img style={imgUserOut} src={require("../../assets/user-red-02.png")} alt="User" />
                      }
                        
                    </button>
                    <Link style={btnMenuStyle} to="/menu">
                      <img style={ imgMenu } src={require("../../assets/menu-blue-64.png")} alt="Menu" />
                    </Link>

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
  sessionActive: state.users.sessionActive
})


const imgUserIn = {
    width: '35px',
    height: '35px',
    overflow: 'hidden',
    border: '1.5px solid blue',
    borderRadius: '50%',
    backgroundColor: 'transparent'
}

const imgUserOut = {
  width: '35px',
  height: '35px',
  overflow: 'hidden',
  border: '1.5px solid red',
  borderRadius: '50%',
  backgroundColor: 'transparent'
}


const imgMenu = {
    width: '25px',
    height: '25px',
    overflow: 'hidden',
    backgroundColor: 'transparent'
}

const btnStyle = {
    width: '30px',
    height: '30px',
    background: 'transparent',
    border: 'none', //'1px solid grey',
    padding: '2px 2px',
    borderRadius: '50%',
    cursor: 'pointer',
  };


  const btnMenuStyle = {
    width: '30px',
    height: '30px',
    background: 'transparent',
    border: 'none', // '1px solid grey',
    padding: '2px 2px',
    borderRadius: '10%',
    cursor: 'pointer',
  };

export default connect(mapStateToProps, { signOut })(TopMenu);

