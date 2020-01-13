import React  from 'react'
import './layout.css'

function ItineraryBox (props) {
        return (
            <div style={cityLink}>
                {props.item.title}
            </div>
        );
    
}


const cityLink = {
    width: '100%',
    height: '120px',
    display: 'block',
    border: '1px solid black',
    margin: '2px'
  } 
export default ItineraryBox
