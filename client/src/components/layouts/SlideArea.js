import React, { Component } from 'react'
import SlideItem from './SlideItem'
import PropTypes from 'prop-types'

export class SlideArea extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }
    render() {
        // console.log('SLIDE AREA:', this.props.theTab)
        return this.props.theTab.map((item) => (
            <SlideItem 
              key = { item._id } 
              id  = { item._id } 
              city = { item.name }
              image = { item.img } 
            />
        ));
    }
}
SlideArea.propTypes = {
    theTab: PropTypes.array.isRequired
  }
export default SlideArea
