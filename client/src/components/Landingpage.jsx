import React from 'react'
import {Link} from "react-router-dom"
import style from '../css/Landingpage.module.css'

export default function Landingpage() {
  return (
    <div className={style.backg}>
    <br/>
    <h2 >Bienvenidos a Tu Apps de Videogames </h2>
    
        <Link to = {'/home'} >
            <button className={style.but}>Start</button>
        </Link>

    </div>
  )
}
