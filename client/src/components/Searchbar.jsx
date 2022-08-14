import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {getinfoName} from '../redux/actions'


export default function Searchbar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

function handleInputChange(e){
    setName(e.target.value)   // este es el value del input, lo que se está escribiendo
}

function handleSubmit(e){
    e.preventDefault()
    if(!name){
        alert("Ingrese nombre")
    }else{
      try{ dispatch(getinfoName(name))   //lo que tengo en el stado name le va a llegar a mi accion 
   
       setName("") }
        catch(e){
            console.log(e, "soy el error ")
        }
    }
    
     
}


  return (
    <form >          
        <input
            value={name}
            type='text'
            placeholder='SEARCH...'
            onChange= {(e) => handleInputChange(e) }
        />
        <button /*disabled={Object.keys(name).length}*/ type='submit' onClick={(e) => handleSubmit(e)}>SEARCH</button>
    </form>
  )
}
