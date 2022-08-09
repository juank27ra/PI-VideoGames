import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {getNameVg} from '../redux/actions'


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
       dispatch(getNameVg(name))   //lo que tengo en el stado name le va a llegar a mi accion 
    setName("") 
    }
    
     
}


  return (
    <form >          
        <input
            value={name}
            type='text'
            placeholder='Search...'
            onChange= {(e) => handleInputChange(e) }
        />
        <button /*disabled={Object.keys(name).length}*/ type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
    </form>
  )
}
