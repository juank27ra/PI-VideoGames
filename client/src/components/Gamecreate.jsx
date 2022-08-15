import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getGenres, postVg, getPlatforms} from '../redux/actions'
import Style  from '../css/Gamecreate.module.css'

function validate(input){
    let errors = {};
    let RegExpressionName = /^[a-zA-Z0-9_¿?¡! .-]*$/
    let RegExpressionImg = /https?:\/\/.*\.(?:png|jpg)/
    
    if(!input.name){
        errors.name = "Se requiere un Nombre"
      }else if (!RegExpressionName.test(input.name)){
       errors.name = 'Nombre no Valido';
        }             
    if(!input.rating ){
        errors.rating = 'Se requiere el número'; 
        }else if(input.rating > 5){
            errors.rating  = '5 es el valor maximo permitido' 
        }else if(input.rating < 0){
            errors.rating = '0 valor minimo permitido'
        }          
    if(!input.released){
        errors.released = 'Se requiere una fecha';
            }
    if(!input.image){
        errors.image = 'Importa una url de imagen'
    }else if(!RegExpressionImg.test(input.image)){
        errors.image = 'Url no valida'
    }
    if(!input.description){
        errors.description = "La descriptcion es requerido."
      } else if(input.description.length > 100){
        errors.description = "La descriptcion no debe exceder los 100 caracteres";
      } 

    return errors;
}

export default function Gamecreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.plataformas)
    const [errors, setErrors] = useState([""])

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

    useEffect(() => {
        dispatch(getPlatforms())
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
        e.preventDefault()
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]               // aqui en el estado me va a guardar cada vez que seleccione un genro en un array
        })
    }

    const handleSelectDos = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postVg(input))
        alert(`videogame creado con exito`);
        setInput({
            name: '',
            rating: '',
            platforms: [],
            released: '',
            image:'',
            description:'',
            genres: []
        })
        history.push('/home')
       
    }
    
     const handleDelete = (e) => {
        setInput({
            ...input,
            genres: input.genres.filter(el => el !== e)
        })
    }
    const handleDeleteDos = (e) => {
        setInput({
            ...input,
            platforms: input.platforms.filter(el => el !== e)
        })
    }

  return (
    <div className={Style.total} >
        <br></br>
          <div className={Style.nombre}>  <h1>CREATE GAMING</h1></div>
          
        <form className={Style.inputs} onSubmit={(e) => handleSubmit(e)}>
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
                        <p>{errors.name}</p>
                    )}
            </div>
            <div>
                <label>Rating: </label>
                <input
                    
                    type= 'number'
                    max= '5'
                    step= '0.01'
                    min= '1'
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
                <select onChange={(e) => handleSelectDos(e)}>
                <option value=''  >Selecciona una opcion</option>
                    {platforms?.map(e => (
                            <option key={e.id} value={e.name}>{e.name}</option>
                    ))}
                </select>
             <div>
                <p>{input.platforms.map(e => e + " ,")}</p> 
                
                    <div className={Style.deletePlat}>
                {input.platforms.map(e => 
                    <div key={e.id} >      {/*  // para que pueda eliminar los generos agregados */}
                            <p>{e}</p>
                            <h3 onClick={() => handleDeleteDos(e)}>x</h3>
                    </div>
                    )}
                 </div>               
             </div>
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
                        <p>{errors.released}</p>
                    )}
            </div>
            <div>
                    <div className={Style.img}>
                           <img className={Style.imgsimul} src={input.image} alt=""/>
                    </div>
                    <label>Imagen: </label>
                    <input
                    type= 'text'            //file
                    value= {input.image}
                    name= 'image'
                    placeholder='Imagen'
                    onChange={(e) => handleChange(e)}
                    required
                    />
                    {errors.image && (
                        <p>{errors.image}</p>
                    )}
            </div>
            <div>
                    <label>Descripción: </label>
                    <textarea
                    type= 'text'
                    value= {input.description}
                    name= 'description'
                    placeholder='description'
                    onChange={(e) => handleChange(e)}
                    />
                     {errors.description && (
                        <p>{errors.description}</p>
                    )}
            </div>

                <div> 
                <label>Genres: </label>    
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

                        {/* lista de generos agregados */}
                    <p>{input.genres.map(e => e + " ,")}</p>       
                </div>


            <div className={Style.deleteGenre}>
            {input.genres.map(e => 
                <div key={e.id} >      {/*  // para que pueda eliminar los generos agregados */}
                        <p>{e}</p>
                        <h3 onClick={() => handleDelete(e)}>x</h3>
                </div>
                    )}
            </div>
    <div>
                    <button type="submit" className={Style.boton}><h3>Crear Videogame</h3></button>
                    <div className={Style.volver}>
                    <Link to='/home'><button>{<h3>Volver</h3>}</button></Link>
                    </div>
    </div>
        </form>     
                
    </div>

  )
}
//disabled={Object.keys(errors).length} 