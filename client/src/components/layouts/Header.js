import React from 'react'


import TopMenu from './TopMenu'
import './layout.css'


function Header () {

    return (
        <header style = { headerStyle }>
          <TopMenu />
        </header>
    )
}

const headerStyle = {
  background: 'rgb(186, 196, 169)',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}


export default Header