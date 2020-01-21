import React  from 'react'
import { Link } from 'react-router-dom'
import './layout.css'

function ItineraryBox (props) {
        
        let x = 1;
        let priceTag = props.item.price;

        if (!isNaN(Number(props.item.price))) {
            if (props.item.price < 100) {
                x = Math.ceil(props.item.price/20);
             } else {
                 x = 5;
             }
             priceTag = '$'.repeat(x);
        }

        return (
            <div className="container" style={cityLink}>
                <div className="row">
                    <div className="col-3" style={profileBox}>

                    </div>
                    <div className="col-9 text-left" style={infoBox}>
                        <div>
                            {props.item.title}  
                        </div>
                        <div className="row">
                            <div className="col small">
                                Likes: { props.item.rating }
                            </div>
                            <div className="col small">
                                { props.item.duration }
                            </div>
                            <div className="col small">
                                 { priceTag }
                            </div>
                        </div>
                        <div>
                            {props.item.hashTags.map((tag, idx) => (<small key={idx}>#{tag} </small>))}
                        </div>
                    </div>
                    <div style={itButton}>
                        <Link to={"/itinerary/" + props.item._id}>v View All v</Link>
                    </div>
                </div>

            </div>
        );
    
}


const cityLink = {
    position: 'relative',
    width: '100%',
    height: '110px',
    display: 'block',
    border: '1px solid black',
    margin: '2px'
  }
  const profileBox = {
      width: '100%',
      height: '80px',
      backgroundColor: 'blue'
  }
  const infoBox = {
    height: '80px',
    backgroundColor: 'red'
}
const itButton = {
    backgroundColor: '#555555',
    width: '100%',
    border: 'none',
    color: 'white',
    padding: '4px 4px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    boxSizing: 'border-box',
    //margin: '4px 2px',
    cursor: 'pointer'
  }
export default ItineraryBox
