import React from 'react'
import {Link} from "react-router-dom"
import style from '../css/Landingpage.module.css'

export default function Landingpage() {
  return (
    <div className={style.backg}>
    <br></br>
        <h2 className={style.tit}>GAMEPAGE</h2>
        <Link to = {'/home'} >
            <button className={style.but}>STAR</button>
        </Link>

    </div>
  )
}
