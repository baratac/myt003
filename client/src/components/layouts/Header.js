import React from 'react'


import TopMenu from './TopNavMenu'
import './layout.css'


function Header () {

    return (
        <header style = { headerStyle }>
          <TopMenu />
        </header>
    )
}

const headerStyle = {
  background: 'white',
  color: '#1A202C',
  textAlign: 'center',
  padding: '10px'
}


export default Header