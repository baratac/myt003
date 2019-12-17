import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class SiteItem extends Component {
    getStyle = () => {
        return {
            backgroundColor: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            color: this.props.site.like ? 'red' : 'blue'
        }
    }
    render() {
        const { id, name } = this.props.site;
        return (
            <div style={ this.getStyle() }>
                <input type="checkbox" onChange={ this.props.toggleLikes.bind( this, id ) }/> {' '}
                <p style={{ display:'inline-block' }}>{ name }</p>
                <button style={ btnStyle } onClick={ this.props.delSite.bind( this, id) }>x</button>
            </div>
        )
    }
}


// INline Stytling................


const btnStyle = {
   background: '#ff0000',
   color: '#fff',
   border: 'none',
   padding: '5px 9px',
   borderRadius: '50%',
   cursor: 'pointer',
   float: 'right'
 };

// Prop Types
SiteItem.propTypes = {
    site: PropTypes.object.isRequired,
    toggleLikes: PropTypes.func.isRequired,
    delSite: PropTypes.func
}

export default SiteItem
