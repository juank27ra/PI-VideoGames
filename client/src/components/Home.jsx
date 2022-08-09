import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames,filterVgByGenres,filterBycreate, orderByName, filterByRating } from '../redux/actions';
import {Link} from 'react-router-dom'
import Cardgame from './Cardgame';
import Paginated from './Paginated';
import Searchbar from './Searchbar';



export default function Home() {

    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)    //trae en esta const todo lo que está en el state videogames en el reducer
    // console.log(allVideogames)
    const [/*order*/, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)       //pag actual = 1 porque siempre voy a iniciar en la primerpagina
    const [vgPerPage, /*setVgPerPage*/] = useState(15)          // cantidad por pag
    const indexLastVg = currentPage * vgPerPage             //indice del ultimo videogm  1*15  2*15
    const indexFirstVg = indexLastVg - vgPerPage;        //inidce del primer Videogm 15-15  30-15 45-15
    const currentVg = allVideogames.slice(indexFirstVg, indexLastVg) //del arreglode vg q me traiga cortalo desde el primer index de la pag hasta el ultimo index  del 0 al 14 porque el 15 no lo incluye el splice   // esto va cambiando
 
    const paginado = (pageNumber) => {        // depende del numero de pag que vaya apretando
      setCurrentPage(pageNumber)              //setea el n de pag y el slice cambia de currentvg
    }

    const nextHandler = () => {
      const nextPage = currentPage + 1; 
      if(indexFirstVg === 1) return;
      setCurrentPage(nextPage)
    }
    const prevHandler = () => {
     const prevPage = currentPage -1
     if(indexLastVg > 0) return 
     setCurrentPage(prevPage)
    }


useEffect(() =>{                // trae del estado los vg cuando el componente se monta   //    me llena el estado cuando se monta el cmponente
  dispatch(getVideogames())     // despacho la action 
}, [dispatch])

function handleClick(e) {
  e.preventDefault();
  dispatch(getVideogames())
  
}
function handleFilterByGenres(e){       //no funcional
  e.preventDefault();
  dispatch(filterVgByGenres(e.target.value))
  setCurrentPage(1); 
}
function handleFilterCreate(e){     // en esta funcion envío a la accion el valor del select
  e.preventDefault();
  dispatch(filterBycreate(e.target.value))
  // setCurrentPage(1);
}
function handleOrderName(e){
  e.preventDefault(); 
  dispatch(orderByName(e.target.value));
  setCurrentPage(1); 
  setOrder(`Ordenado ${e.target.value}`)
}

function handleFilterRating(e){
e.preventDefault(); 
dispatch(filterByRating(e.target.value))      //no funcional
setCurrentPage(1); 
}

  return (
    <div>
    <br/>
    <br/>
          <Link to = {'/videogames' }>
          <button>Crear Videogame 🛣️</button>
          </Link>  
          <h1>Videogames</h1>
          <button onClick={e => {handleClick(e)}} >
                Todos los Juegos
          </button>

          <div>
            <select onChange={e => handleFilterByGenres(e)} >
                <option value=''>Genero</option>
                {/* <option value='All'>Todos</option> */}
                <option value='Action'>Action</option>
                <option value='Indie'>Indie</option>
                <option value='Adventure'>Adventure</option>
                <option value='RPG'>RPG</option>
                <option value='Strategy'>Strategy</option>
                <option value='Shooter'>Shooter</option>
                <option value='Casual'>Casual</option>
                <option value='Simulation'>Simulation</option>
                <option value='Puzzle'>Puzzle</option>
                <option value='Arcade'>Arcade</option>
                <option value='Platformer'>Platformer</option>
                <option value='Racing'>Racing</option>
                <option value='Massively Multiplayer'>Massively Multiplayer</option>
                <option value='Sports'>Sports</option>
                <option value='Fighting'>Fighting</option>
                <option value='Family'>Family</option>
                <option value='Board Games'>Board Games</option>
                <option value='Educational'>Educational</option>
                <option value='Card'>Card</option>
            </select>
          
            <select onChange={e => handleFilterCreate(e)}>
                <option value=''>Procedencia</option>
                <option value='All'>Todos</option>
                <option value='Created'>Creados</option>
                <option value='Api'>Existentes</option>
            </select>
          
            <select onChange={e => handleOrderName(e)}>  
                <option value=''>Orden</option>
                <option value='Asc'>A-Z</option>
                <option value='Desc'>Z-A</option> 
            </select>
          
            <select onChange={e => handleFilterRating(e)} >
                <option value=''>Rating</option>
                <option value='1'>Uno</option>
                <option value='2'>Dos</option> 
                <option value='3'>Tres</option> 
                <option value='4'>Cuatro</option> 
                <option value='5'>Cinco</option> 
            </select>
            <br></br>
            <br></br>       
            <Searchbar/>
          <div> 
            <Paginated
                vgPerPage={vgPerPage}       //15
                allVideogames={allVideogames.length}    //const
                paginado={paginado}     //paso mi const pag
                currentPage={currentPage}
            />
          </div>
      {
        //me traigo las props de card porque este componente home ya se trajo el componente
        // global, entonces lo mapeo y le paso cada cosa que necesito en la card
        currentVg ?
        currentVg.map((e) => {
          return (        
            <div key={e.id}>
               <Link to = {"/home/" + e.id} /*style={{ textDecoration: 'none' }}*/>
               <Cardgame 
               name={e.name}
               image={e.image}    //tener en cuenta como la creé en el db
               genres={e.genres}
               key={e.id}/>                
              </Link>
            </div>
              )
            }) : <h2>Loading...</h2>
            }
            <h5>Pagina: {currentPage}</h5>
             <button onClick={e => prevHandler(e)}>Prev</button> <button onClick={ e =>nextHandler(e)}>Next</button>
             
          </div>
              <Link to={'/'} className='titulo'> Exit</Link>   
    </div>
  )
}

