import axios from 'axios'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES'
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const FILTER_BY_RATING = 'FILTER_BY_RATING'
export const GET_NAME_VG = 'GET_NAME_VG'
export const GET_GENRES = 'GET_GENRES'
export const POST_VG = 'POST_VG'
export const GET_DETAIL = 'GET_DETAIL'
export const DETAIL_CLEAN = 'DETAIL_CLEAN'
export const GET_NAME = 'GET_NAME'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const NOT_FOUND = 'NOT_FOUND'
export const EMPTY_ERROR = 'EMPTY_ERROR'


export const getVideogames = (name) => {
    return async function (dispatch) {
        if(name){
            return await axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then(json => json.data)
            .then(json =>
              {
                dispatch({ type: GET_VIDEOGAMES, payload: json})
              })
          }
          var json = await axios.get(`http://localhost:3001/videogames`)          // aqui conexion entre back y front
          return dispatch({
              type: GET_VIDEOGAMES,
              payload: json.data
          })
        }}

export const filterVgByGenres = (payload) => {
  return async (dispatch) => {
    return dispatch({
      type: FILTER_BY_GENRES,
      payload 
    })
  }}

export const filterBycreate = (payload) => {
  return {
    type: FILTER_BY_CREATED,                   
    payload
  }
}

export const orderByName = (payload) =>{
  return{
    type: ORDER_BY_NAME,
    payload
  }
}

export const filterByRating = (payload) => {
  return {
    type: FILTER_BY_RATING,
    payload
  }
}

export const getNameVg = (name) =>{
  return async (dispatch) => {
    try {
      var json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
      return dispatch({
        type: GET_NAME_VG,
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getGenres = () => {
  return async (dispatch) => {
    var json = await axios.get(`http://localhost:3001/genres`)
    return dispatch({
      type: GET_GENRES,
      payload: json.data
    })
  }
}

export const postVg = (data) => {
  return async (dispatch) => {
    await axios.post(`http://localhost:3001/videogames`, data)   // s
    // return dispatch({
    //   type: POST_VG,
    //   payload: json.data
    // })
   
  // return json.data
  }
}



export const getDetail = (id) => {
  return async (dispatch) => {
    if (id){
      return await axios.get(`http://localhost:3001/videogame/${id}`)     //s
      .then(res => res.data)
      .then(res => 
        {
        dispatch({
          type: GET_DETAIL, 
          // type: GET_DETAIL, payload: console.log(res),
          payload: res})
      })
    }
  }
}

export const detailClean = (payload) => {
  return {
    type: DETAIL_CLEAN,
    payload
  }
}

export const getinfoName = (name) => {
  return async (dispatch) => {
    if (name){
      return await axios.get(`http://localhost:3001/videogame/name?name=${name}`)     //s
      .then(res => res.data)
      .then(res => 
        {
        dispatch({
          type: GET_NAME,
          payload: res})
      }).catch(res => dispatch({type: NOT_FOUND, payload: res.response.data}))
    }
  }
}
//----------------------plataformas para el create-----------------
export const getPlatforms = () => {
  return async (dispatch) => {
    var json = await axios.get(`http://localhost:3001/videogames/platforms`)
    return dispatch({
      type: GET_PLATFORMS,
      payload: json.data
    })
  }
}
export const emptyError = () => {
  return async (dispatch) => {
    return dispatch({
      type: EMPTY_ERROR
    })
  }
}
