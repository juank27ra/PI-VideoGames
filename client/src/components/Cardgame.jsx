import React from 'react'

export default function Cardgame({image, name, genres}) {
  return (
    <div>
        <h3>{name}</h3>
        <h5>{genres}</h5>
        <img src={image} alt='imagen not found' width='350px' height='350px' />
    </div>
  )
}
