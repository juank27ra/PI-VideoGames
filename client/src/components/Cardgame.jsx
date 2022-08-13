import React from 'react'

export default function Cardgame({image, name, genres, rating}) {
  return (
    <div>
        <h1><b>{name}</b></h1>
        <img src={image} alt='imagen not found' width='350px' height='350px' />
        <h3>{genres}</h3>
        <h3>{rating}</h3>
    </div>
  )
}
