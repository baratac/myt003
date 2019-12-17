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
        console.log('SLIDE AREA:', this.props.theTab)
        return this.props.theTab.map((item) => (
            <SlideItem 
              key = { item.id } 
              id  = { item.id } 
              city = { item.city }
              image = { item.img } 
            />
        ));
    }
}
SlideArea.propTypes = {
    theTab: PropTypes.array.isRequired
  }
export default SlideArea
