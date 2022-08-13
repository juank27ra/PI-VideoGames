import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDetail, detailClean} from '../redux/actions'
import { Link } from 'react-router-dom'


export default function Detail(props) {
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

    console.log(getVgDetail)
  return (
    <div>

        {
            getVgDetail ? 
            
                <div  >
                    <h1>Soy {getVgDetail.name }</h1>
                      <img src= {getVgDetail.image} width="500px" height="350px" alt=""/> 
                    <h4>Rating: {getVgDetail.rating}</h4>
                    <h4>Plataformas: {getVgDetail?.platforms}</h4>
                   <h4>Descripción: {getVgDetail?.description}</h4>
                    <h3>Generos: {getVgDetail?.genres?.map((e, i) => (<p key={i}>{e}</p>))}</h3>
                    <Link to='/home'><button>Volver</button></Link> 
                </div> : <p>Loading...</p>
        }
            
    </div>
  )
}
