import React from 'react'
import {Link} from "react-router-dom"

export default function Landingpage() {
  return (
    <div>
    <br/>
    <h1 >Bienvenidos a Tu Apps de Videogames</h1>
        <Link to = {'/home'} >
            <button>Ingresar</button>
        </Link>

    </div>
  )
}
