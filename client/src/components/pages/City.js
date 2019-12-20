import React from 'react'

function City({ match }) {
    console.log('City Page: ', match.params.id)
    return (
        <div>
            <h1>CiTy pAge</h1>
            <h3>ID: { match.params.id }</h3>
        </div>
    )
}

export default City;
