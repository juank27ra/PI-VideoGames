import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDetail} from '../redux/actions'
import { Link, useParams } from 'react-router-dom'


export default function Detail(props) {
    // console.log(props)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getDetail(props.match.params.id))
    // })

    // const myVg =useSelector ((state) => state.detail)  

    const dispatch = useDispatch()
    const { id } = useParams(); // Para acceder al id del Detail


    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    const myVg =useSelector ((state) => state.detail)    
    console.log(myVg)


  return (
    <div>

        {
            myVg ? 
                <div >
                    <h1>{myVg.name}</h1>
                     <img className={myVg.img} src= {myVg.image} alt=""/> 
                    <h4>Rating: {myVg.rating}</h4>
                    <h4>Plataformas: {myVg.platforms}</h4>
                    <h4>Descripción: {myVg.description}</h4>
                    <h3>Generos: {!myVg.createInDb ? myVg.genres + ' ' : myVg[0].genres.map(e => e.name + (' '))}</h3>
                    <Link to='/home'><button>Volver</button></Link>
                </div> : <p>Loading...</p>
        }
            <Link to={'/'} className='titulo'> Salir</Link>          
    </div>
  )
}
// console.log(Detail())