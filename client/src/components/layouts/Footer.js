import React, { Component } from 'react'
import {  Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import PropTypes from 'prop-types'




export class Footer extends Component {


  slideOption =  (ev) => {
    console.log('SLIDE OPT', ev.target.id);
    console.log("Props:", this.props)
    this.props.slideOpt(ev.target.id)
  }

  render() {
    let location = this.props.location;
    //console.log('FOOTER:', location);
    if (location.pathname !== '/') {
      return (
        <div className="mx-auto">
          <Link className="imgStyle" to="/">
            <Image src="./assets/homeIcon.png"  width={40} height={40}/>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center">
          <button 
            id="left-btn"
            style={btnStyle}
            onClick={ this.props.slideOpt.bind(this,'left') }
          >
            <img id="left-img" style={ imgMenu } src="./assets/arrow-blue-l64.png" alt="Left" />     
          </button>
          <button 
            id="page1-btn"
            style={btnStyle}
            onClick={ this.props.slideOpt.bind(this,1)}
          >
            <img id="page1-img" style={ imgMenu } src="./assets/circle-blue-64.png" alt="Page 1" />     
          </button>
          <button 
            id="page2-btn"
            style={btnStyle}
            onClick={ this.props.slideOpt.bind(this,2) }
          >
            <img id="page2-img" style={ imgMenu } src="./assets/circle-blue-64.png" alt="Page 2" />     
          </button>
          <button 
            id="page3-btn"
            style={btnStyle}
            onClick={ this.props.slideOpt.bind(this,3) }
          >
            <img id="page3-img" style={ imgMenu } src="./assets/circle-blue-64.png" alt="Page 3" />     
          </button>
          <button 
            id="right-btn"
            style={btnStyle}
            onClick={ this.props.slideOpt.bind(this,'right') }
          >
            <img id="right-img" style={ imgMenu } src="./assets/arrow-blue-r64.png" alt="right" />     
          </button>
        </div>
      );
    }
  }
}


Footer.propTypes = {
  location: PropTypes.object.isRequired,
   slideOpt: PropTypes.func.isRequired
}

const btnStyle = {
  width: '30px',
  height: '30px',
  background: 'transparent',
  border: 'none', // '1px solid grey',
  padding: '2px 2px',
  borderRadius: '10%',
  cursor: 'pointer',
};

const imgMenu = {
  width: '15px',
  height: '15px',
  overflow: 'hidden',
  backgroundColor: 'transparent'
}
export default Footer;