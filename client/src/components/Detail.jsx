import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDetail, detailClean} from '../redux/actions'
import { Link } from 'react-router-dom'


export default function Detail(props) {
    // console.log(props)
    const dispatch = useDispatch()
    const id = props.match.params.id
    const getVgDetail = useSelector((state) => state.detail)


    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    useEffect(() => {
    return () => {
        dispatch(detailClean())
    }    
    }, [dispatch])


  return (
    <div>

        {
            getVgDetail ? 
                <div >
                    <h1>{getVgDetail.name}</h1>
                     <img className={getVgDetail.img} src= {getVgDetail.image} alt=""/> 
                    <h4>Rating: {getVgDetail.rating}</h4>
                    <h4>Plataformas: {getVgDetail.platforms}</h4>
                    <h4>Descripción: {getVgDetail.description}</h4>
                    <h3>Generos: {!getVgDetail.createInDb ? getVgDetail.genres + ' ' : getVgDetail[0].genres.map(e => e.name + (' '))}</h3>
                    <Link to='/home'><button>Volver</button></Link> 
                </div> : <p>Loading...</p>
        }
            <Link to={'/'} className='titulo'> Salir</Link>          
    </div>
  )
}
// console.log(Detail())