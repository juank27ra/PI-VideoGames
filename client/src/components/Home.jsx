import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames,filterVgByGenres,filterBycreate, orderByName, filterByRating, getGenres, emptyError, getPlatforms, filterByPlataformas } from '../redux/actions';
import {Link} from 'react-router-dom'
import Cardgame from './Cardgame';
import Paginated from './Paginated';
import Searchbar from './Searchbar';
import style from '../css/Home.module.css'



export default function Home() {

    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)    //trae en esta const todo lo que está en el state videogames en el reducer
    const allGenres = useSelector((state) => state.genres)
    const error = useSelector((state) => state.noEncontrado)
    const platf = useSelector((state) => state.plataformas)
  console.log(platf)

    const [/*order*/, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)       //pag actual = 1 porque siempre voy a iniciar en la primerpagina
    const [vgPerPage, /*setVgPerPage*/] = useState(15)          // cantidad por pag
    

    const indexLastVg = currentPage * vgPerPage             //indice del ultimo videogm  1*15  2*15
    const indexFirstVg = indexLastVg - vgPerPage;        //inidce del primer Videogm 15-15  30-15 45-15
    const currentVg = allVideogames.slice(indexFirstVg, indexLastVg) //del arreglode vg cortalo desde el primer index de la pag hasta el ultimo index  del 0 al 14

    const paginado = (pageNumber) => {        // depende del numero de pag que vaya apretando
      setCurrentPage(pageNumber)              //setea el n de pag y el slice cambia de currentvg
    }

    const nextHandler = () => {
      const nextPage = currentPage + 1; 
      if(currentPage === (Math.ceil(allVideogames.length/15))) return 
      setCurrentPage(nextPage)
    }
    const prevHandler = () => {
    const prevPage = currentPage - 1
    if(indexFirstVg === 0) return
    setCurrentPage(prevPage)
    }

useEffect(() =>{                // trae del estado los vg cuando el componente se monta   //    me llena el estado cuando se monta el cmponente
    dispatch(getVideogames())     // despacho la action  
}, [dispatch])


useEffect(() =>{                // trae del estado los generos cuando el componente se monta   //  
  dispatch(getGenres())     // despacho la action 
}, [dispatch])

useEffect(() => {
  dispatch(getPlatforms())
}, [dispatch])

function handleClick(e) {
  e.preventDefault();
  dispatch(getVideogames())
  dispatch(emptyError())
  setCurrentPage(1)
}
function handleFilterByGenres(e){       
  e.preventDefault();
  if(e.target.value === 'null') return
  dispatch(filterVgByGenres(e.target.value))
  setCurrentPage(1); 
}
function handleFilterCreate(e){     // en esta funcion envío a la accion el valor del select
  e.preventDefault();
  if(e.target.value === 'null') return
  dispatch(filterBycreate(e.target.value))
  setCurrentPage(1);
}
function handleOrderName(e){
  e.preventDefault(); 
  if(e.target.value === 'null') return
  dispatch(orderByName(e.target.value));
  setCurrentPage(1); 
  setOrder(`Ordenado ${e.target.value}`)
}

function handleFilterRating(e){
  e.preventDefault(); 
  if(e.target.value === 'null') return
  dispatch(filterByRating(e.target.value))     
  setCurrentPage(1); 
  setOrder(`Ordenado ${e.target.value}`)
}

function handleorderPlatform(e){       
  e.preventDefault();
  if(e.target.value === 'null') return
  dispatch(filterByPlataformas(e.target.value))
  setCurrentPage(1); 
}

  return (
    <div className={style.context}>
    <br/>
    <br/>
          <h1 className={style.titulo}>GAME ZONE</h1>
    <div className={style.navtot}>
          <br></br>
      <div className={style.navbar}>
      <Searchbar  setCurrentPage={setCurrentPage}/>
        
          <div>
          <select onChange={e => handleorderPlatform(e)}>
          <option value='null'>PLATFORMS</option>
          {platf.map(e => (
            <option key={e.id} value={e.name}>{e.name}</option> 

          ))}
          </select>
          
            <select onChange={e => handleFilterByGenres(e)} >
                <option value='null' >GENRE</option>
                {allGenres.map(e => (
                      <option key={e.id} value={e.name}>{e.name}</option>  
                ))
                }
            </select>
            <select onChange={e => handleFilterCreate(e)}>
                <option value='null'  >ORIGIN</option>
                <option value='All'>ALL</option>
                <option value='Created'>CREATED</option>
                <option value='Api'>EXISTING</option>
            </select>
          
            <select onChange={e => handleOrderName(e)}>  
                <option value='null'>ORDER</option>
                <option value='Asc'>A-Z</option>
                <option value='Desc'>Z-A</option> 
            </select>
          
            <select onChange={e => handleFilterRating(e)} >
                <option value='null' >RATING</option>
                <option value='Asc'>UPWARD</option>
                <option value='Desc'>FALLING</option> 
            </select>      
            <button onClick={e => {handleClick(e)}}>All GAMES </button> 

            <Link to = {'/create' }><button>CREATE GAMING</button></Link>
          </div>   
    </div>
    </div>
          <div> 
          {
            error.length > 0 ? <img src='https://i.pinimg.com/564x/5f/92/5a/5f925a4b065b191e76aed89ab4d94d17.jpg' 
            alt='' height="500px" width="600px" />:  
            <Paginated 
                vgPerPage={vgPerPage}       //15
                allVideogames={allVideogames.length}    //const
                paginado={paginado}     
                currentPage={currentPage}
                prevHandler={prevHandler}
                nextHandler={nextHandler}
            />
                }
          </div>

          <div className={style.card}>
                {
                error.length > 0 ? <h1 >{error[0]}</h1> :
                currentVg ?
                currentVg.map((e) => {
                  return (        
                    <div key={e.id} >
                        <Link to = {"/home/" + e.id}>
                        <Cardgame 
                        name={e.name}
                        image={e.image}    
                        genres={e.genres}
                        rating={e.rating}
                        platforms={e.platforms}
                        key={e.id}/>                
                        </Link>
                    </div>
                      )
                    }) : <h2>Loading...</h2>
                  }
              </div>
                <div className={style.botones}>
                  { error.length > 0 ? null:  <h5>Pagina: {currentPage}</h5>}
                  <button onClick={e => prevHandler(e)}>Prev</button> <button onClick={ e =>nextHandler(e)}>Next</button>
                </div>
                <br/>
                {/* <Link '/landingPage'> volver</Link> */}
    </div>
  )
}