import React from 'react'

const SubmitButton = ({text}) => {
  return (
    <button className='shadow-lg shadow-themeShadow bg-themeBlue hover:bg-themeBlueLight py-2 px-3 lg:text-lg lg:py-3 lg:px-4 rounded-md text-white'>{text}</button>
  )
}

export default SubmitButton