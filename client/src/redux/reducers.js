import {GET_VIDEOGAMES, FILTER_BY_GENRES, FILTER_BY_CREATED, ORDER_BY_NAME, FILTER_BY_RATING, GET_NAME_VG, GET_GENRES, POST_VG, GET_DETAIL } from './actions'
const initialState = {
        videogames: [],
        allVideogames:[],               // este estado para que siempre se guarde todos los vg y busque sobre todos
        genres: [],
        detail: {}
}

export default function rootReducers(state = initialState, action) {
    switch(action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,      // en mi stado vg manda, action.payload, todo lo que mande la action get_videogame
                allVideogames: action.payload     //tambien pon todos los vg en allvg
            }
        case FILTER_BY_GENRES:
            const allGenres = state.genres
            const filterGenres = action.payload === 'All' ? allGenres : allGenres.filter(e => e.name === action.payload)
            return {
                ...state,
                genres: filterGenres
            }
        case FILTER_BY_CREATED:
            const allVideogames = state.allVideogames
            // const filterBycreate = action.payload === 'All' ? allVideogames : action.payload === 'Created'? allVideogames.filter(e => e.createInDb) : allVideogames.filter(e => !e.createInDb)
            const filterBycreate = action.payload === 'Created'? allVideogames.filter(e => e.createInDb) : allVideogames.filter(e => !e.createInDb)
                return {
                ...state,
                // videogames: filterBycreate    
                videogames: action.payload === 'All' ? state.allVideogames : filterBycreate
            }
        case ORDER_BY_NAME:
            const orderArr = action.payload === 'Asc'?
            state.videogames.sort((a, b) =>{
                if(a.name > b.name) return 1        //true
                if(b.name > a.name) return -1
                return 0
            }) :
            state.videogames.sort(function(a, b){
                if(a.name > b.name) return -1
                if(b.name > a.name) return 1
                return 0
            })
            return{
                ...state,
                videogames: orderArr
            }
        case FILTER_BY_RATING:
            const filterRating = state.videogames
            const filtrado = action.payload === '5' ? filterRating.filter(e => e.rating) : filterRating.filter(e => e.rating === action.payload)
            return{
                ...state,
                videogames: filtrado
            }
            case GET_NAME_VG:
                return {
                    ...state,
                    videogames: action.payload
                }
            case GET_GENRES:
                return {
                    ...state,
                    genres: action.payload
                }
            case POST_VG:
                return{
                    ...state, 
                }
            case GET_DETAIL:
                return {
                    ...state,
                    detail: action.payload          //
                }
        default:
            return state;
    }

};