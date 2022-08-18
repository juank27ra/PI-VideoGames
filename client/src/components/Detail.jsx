import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDetail, detailClean} from '../redux/actions'
import { Link } from 'react-router-dom'
import style from '../css/Detail.module.css'


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

    // function onClick (e) {
    //   return window.history.back()
    // }
  
    // history.push({currentpage})
    // history.goBack()
    // window.history.back();
    // window.history.go(-1);
// window.history.back();
// history.window.history.go(-1);


  return (
    <div className={style.fondo}>

        {
            getVgDetail ? 
            
                <div className={style.descrip} >
                    <h1>{getVgDetail.name }</h1>
                    <br/>
                      <img src= {getVgDetail.image} width="600px" height="340px" alt=""/> 
                    <h4>Description: {getVgDetail?.description}</h4>
                    <h4>Rating: {getVgDetail.rating}</h4>
                    <h4>Platforms: {getVgDetail?.platforms + ', '}</h4>
                    <h4>Genres: {getVgDetail?.genres?.map((e, i) => (<p key={i}>{e}</p>))}</h4>
                    <Link to='/home'><button>Volver</button></Link> 
                    {/* <input type="button" value="Página anterior" onClick="history.go(-1)"></input> */}
                </div> : <p>Loading...</p>
        }
            
    </div>
  )
}
