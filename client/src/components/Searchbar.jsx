import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {getinfoName} from '../redux/actions'
import style from '../css/Searchbar.module.css'


export default function Searchbar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

function handleInputChange(e){
    setName(e.target.value)   // este es el value del input, lo que se está escribiendo
}

function handleSubmit(e){
    e.preventDefault()
    if(!name){
        alert("Ingrese nombre de busqueda")
    }else{
      try{ dispatch(getinfoName(name))   //lo que tengo en el input name le va a llegar a mi accion 
   
       setName("") }
        catch(e){
            console.log(e, "soy el error ")
        }
    }  
}


  return (
    <div >
    <form >          
        <input
            className={style.search}
            value={name}
            type='text'
            placeholder='SEARCH...'
            onChange= {(e) => handleInputChange(e) }
        />
        <button className={style.but} disabled={Object.keys(!name).length} type='submit' onClick={(e) => handleSubmit(e)}>SEARCH</button>
    </form>
  </div>  
  )
}
