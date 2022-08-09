import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getGenres, postVg} from '../redux/actions'
// import Style  from '../css/Gamecreate.module.css'

function validate(input){
    let errors = {};
    
    if(!input.name){
        errors.name = 'Se requiere un Nombre';
    }else if (!input.rating !== 'number' ){                                   //imput tiene la propiedad require para que sea requerido texto en cualquier campo
        errors.rating = 'Se requiere el número entre 0 y 5';            //hacer validacion por back y front es la mejor opcion
    }else if(!input.platforms){
        errors.platforms ='Escoge una o mas plataformas';
    }else if(!input.released){
        errors.released ='Se requiere una fecha';
    }
    return errors;
}

export default function Gamecreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)
    // const vg = useSelector((state) => state.videogames)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({        //para guardar el formulario, lo que necesita el post
            name: '',
            rating: '',
            platforms: [],
            released: '',
            image:'',
            description:'',
            genres: []
    })
    
    useEffect(() => {
        dispatch(getGenres())       //para uqe me cargue todos los generos
    }, [dispatch])

    const handleChange = (e) => {               // a  mi estado input
        setInput({                              
            ...input,                           // ademas de lo que tiene 
            [e.target.name] : e.target.value        //agregale el targeut value de lo que esté modiicando
        })  
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))                                         // si name es name o rating o es platform
    }                                               // y a la medida que va modificando me va llenando el estado
    const handleSelect = (e) => {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]               // aqui en el estado me va a guardar cada vez que seleccione un temperamento en un array
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefaul(e)
        dispatch(postVg(input))
        alert("videogame creado")
        setInput({
            name: '',
            rating: '',
            platforms: [],
            released: '',
            image:'',
            description:'',
            genres: []
        })
        history.push('./home')
    }
     const handleDelete = (e) => {
        setInput({
            ...input,
            genres: input.genres.filter(el => el !== e)
        })
    }


  return (
    <div >
        <br></br>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea Tu VideoGame</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Nombre: </label>
                <input
                    type= 'text'
                    value={input.name}
                    name= 'name'
                    placeholder='name'
                    onChange={handleChange}
                />
                {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
            </div>
            <div>
                <label>Rating: </label>
                <input
                    // required
                    type= 'number'
                    value={input.rating}
                    name= 'rating'
                    placeholder='rating'
                    onChange={handleChange}
                />
                {errors.rating && (
                        <p className="error">{errors.rating}</p>
                    )}
            </div>
            <div>
                <label>Plataformas: </label>
                <input
                // cambiar parapoder escoger plataformas
                    type= 'text'
                    value={input.platforms}
                    name= 'platforms'
                    placeholder='platforms'
                    onChange={handleChange}
                />
                {errors.platforms && (
                        <p className="error">{errors.platforms}</p>
                    )}
            </div>
            <div>
                <label>Fecha de Creacion: </label>
                <input
                    type= 'date'
                    value={input.released}
                    name= 'released'
                    placeholder='released'
                    onChange={handleChange}
                />
                {errors.released && (
                        <p className="error">{errors.released}</p>
                    )}
            </div>
            <div>
                    <label>Imagen: </label>
                    <input
                    type= 'text'
                    value= {input.image}
                    name= 'image'
                    placeholder='Imagen'
                    onChange={(e) => handleChange(e)}
                    />
            </div>
            <div>
                    <label>Descripción:</label>
                    <textarea
                    type= 'text'
                    value= {input.description}
                    name= 'description'
                    placeholder='description'
                    onChange={(e) => handleChange(e)}
                    />
            </div>

                <div> Genres:    
                 <select onChange={(e) => handleSelect(e)}>
                     <option value='' >Selecciona una opcion</option>
                        {genres?.map((e) => {               //mapeo el state
                                return(
                                    <>
                                <option key={e.id} value={e.name}>{e.name}</option>   
                                    </>
                                )
                        })}
                </select>

                    <p>{input.genres.map(e => e + " ,")}</p> 
                    <button /*disabled={Object.keys(errors).length}*/ type="submit"> Crear Videogame</button>
                    {input.genres.map(e => 
                <div key={e.id} >       
                        <p>{e}</p>
                        <button onClick={() => handleDelete(e)}>x</button>
                </div>
                    )}
            </div>
            

        </form>
        
    </div>
  )
}
