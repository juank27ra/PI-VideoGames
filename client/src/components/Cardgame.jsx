import React from 'react'
import style from '../css/Cardgame.module.css'

export default function Cardgame({image, name, genres, rating}) {
  return (
    <div className={style.gen} >
    <p ><b>{name}</b></p>
        <img className={style.card}  src={image} alt='imagen not found' width='280px' height='280px' />
        <p>{genres}</p>
        <p>{rating}</p>
    </div>
  )
}
