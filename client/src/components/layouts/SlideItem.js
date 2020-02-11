import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import './layout.css'

export default function SlideItem(props) {

        return (
             <Link to={"/city/" + props.id} className="block h-32 w-40">
                <Card className="text-white m-1 text-center">
                    <Card.Img src={ props.image } className="h-full w-full object-fit" alt="City Favorite" />
                    <Card.ImgOverlay>
                        <Card.Title 
                          className="h6 align-self-center bg-dark"
                          style={ {opacity: '0.5'}}
                        >
                          {props.city}
                        </Card.Title>
                    </Card.ImgOverlay>
                </Card>
            </Link>
        );
    
}


const cityLink = {
    width: '160px',
    height: '120px',
    display: 'block',
  } 

