import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SiteItem from './SiteItem'


export class AppSites extends Component {

    render() {
        console.log(this.props.content);
        return this.props.content.map((item) => (
            <SiteItem 
              key = { item.id } 
              site = { item } 
              toggleLikes = { this.props.toggleLikes }
              delSite = { this.props.delSite } 
              />
        ));
    }
}

AppSites.propTypes = {
    content: PropTypes.array.isRequired,
    toggleLikes: PropTypes.func.isRequired,
    delSite: PropTypes.func
}

export default AppSites
