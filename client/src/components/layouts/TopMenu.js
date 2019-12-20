import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
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
        }
        this.setState({
            openUserMenu: closeIt
          })
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
                        <img style={imgUser} src={require("../../assets/user-red.png")} alt="User" />
                    </button>
                    <Link style={btnMenuStyle} to="/menu">
                      <img style={ imgMenu } src={require("../../assets/list-view-blue.png")} alt="Menu" />
                    </Link>

                </div>
                <Collapse in={ this.state.openUserMenu } timeout={ 1500 }>
                  <div id="usermenu" onChange={ this.collapseState } className="collapse mt-2">
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
                </Collapse>
            </div>
        )
    }
}

const imgUser = {
    width: '25px',
    height: '25px',
    overflow: 'hidden',
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

export default TopMenu;

