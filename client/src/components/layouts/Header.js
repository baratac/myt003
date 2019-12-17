import React from 'react'
import { Image } from 'react-bootstrap'

import TopMenu from './TopMenu'
import './layout.css'


function Header () {

    return (
        <header style = { headerStyle }>
          <TopMenu />
          <div style={{backgroundColor: '#fff', marginTop: '10px'}}>
            <Image src="./assets/MYtineraryLogo.png" style={ imgStyle } />
          </div>
        </header>
    )
}

const headerStyle = {
  background: 'rgb(186, 196, 169)',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

const imgStyle = {
  marginLeft: '-5px',
  width: '320px',
  height: '100px'
}

export default Header