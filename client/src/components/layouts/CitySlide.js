import React from 'react'

export default function CitySlide(props) {
    return (
        <div className="w-full max-w-sm sm:max-w-md sm:mx-auto">
            <div className="relative ">
                <img 
                    className="w-full object-cover rounded shadow-md h-1/4"
                    src={ props.city.img } 
                    alt="City Pic"
                />
            </div>
            <div className="relative px-4">
                <div className="bg-gray-100 h-12 p-3 -mt-4 flex content-center justify-center rounded shadow-lg">
                    <h4 className="text-gray-700 font-semibold text-lg leading-tight truncate">
                        { props.city.name }
                    </h4>
                </div>
            </div>            
        </div>
    )
}
