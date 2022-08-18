import React from 'react'
import style from '../css/Cardgame.module.css'

export default function Cardgame({image, name, genres, rating}) {


  return (
    
    <div className={style.gen} >
    <div>
    Genres: {genres.map((e) => 
      <p key={e.name}>{e.name}</p>
    )}
  </div>

    <p ><b>{name}</b></p>
        <img className={style.card}  src={image} alt='imagen not found' width='280px' height='280px' />
        {/* <p>Genre: {genres}</p> */}
        <p> Rating: {rating}</p>
    </div>
  )
}
