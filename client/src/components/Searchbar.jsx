import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {getNameVg} from '../redux/actions'


export default function Searchbar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)   
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameVg(name))
    setName('')
}


  return (
    <div>
        <input
            type='text'
            pllaceholder='Search...'
            onChange= {(e) => handleInputChange(e) }
        />
        <button /*disabled={Object.keys(name).length}*/ type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
  )
}
