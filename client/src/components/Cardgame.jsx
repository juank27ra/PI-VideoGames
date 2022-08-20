import React from 'react'
import style from '../css/Cardgame.module.css'

export default function Cardgame({image, name, genres, rating, platforms}) {

  return (
    
    <div className={style.gen} >

    <p className={style.titelname}><b>{name}</b></p>
        <img className={style.card}  src={image} alt='imagen not found' width='280px' height='280px' />
        <p className={style.titlerating}> Rating:</p><p> {rating}</p>
        <div className={style.contegenero}>
        <p className={style.titlegenero}>Genres:</p> {genres.map((e, i) => 
          <p className={style.genero} key={i}>{e.name? e.name : e}</p>
        )}
        <p className={style.titlegenero}>Platforms:</p> {platforms.map((e, i) => 
          <p className={style.platforms} key={i}>{e.name? e.name : e}</p>
        )}
      </div>
    </div>
  )
}
