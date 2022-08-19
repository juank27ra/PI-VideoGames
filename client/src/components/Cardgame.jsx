import React from 'react'
import style from '../css/Cardgame.module.css'

export default function Cardgame({image, name, genres, rating, platforms}) {
console.log({platforms})
  return (
    
    <div className={style.gen} >

    <p className={style.titelname}><b>{name}</b></p>
        <img className={style.card}  src={image} alt='imagen not found' width='280px' height='280px' />
        <p className={style.titlerating}> Rating:</p><p> {rating}</p>
        <div className={style.contegenero}>
        <p className={style.titlegenero}>Genres:</p> {genres.map((e, i) => 
          <p className={style.genero} key={i}>{e.name? e.name : e}</p>
        )}
        platforms: {platforms.map(e =>
        <p key={e}>{e}</p> )}
      </div>
    </div>
  )
}
