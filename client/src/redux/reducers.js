import {GET_VIDEOGAMES, FILTER_BY_GENRES, FILTER_BY_CREATED, ORDER_BY_NAME, FILTER_BY_RATING, 
    GET_NAME_VG, GET_GENRES, POST_VG, GET_DETAIL, DETAIL_CLEAN, GET_NAME, GET_PLATFORMS, NOT_FOUND, EMPTY_ERROR, FILTER_PLATFORMS } from './actions'
const initialState = {
        videogames: [],
        allVideogames:[],               // este estado para que siempre se guarde todos los vg y busque sobre todos
        genres: [],
        detail: [],
        filtered: [],
        plataformas: [],
        noEncontrado: []
}

export default function rootReducers(state = initialState, action) {
    switch(action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,      // en mi stado vg manda, action.payload, todo lo que mande la action get_videogame
                allVideogames: action.payload,//tambien pon todos los vg en allvg
                filtered: action.payload     
            }
        case FILTER_BY_GENRES:
            const genres = state.allVideogames
            const allgenres = genres.filter(e => {
                if(!e.genres) return undefined
                return e.genres.includes(action.payload)
            })
            return {
                ...state,
                videogames: allgenres
            }
        case FILTER_PLATFORMS:
            const plat = state.allVideogames
            const allplatf = plat.filter(e => {
                if(!e.platforms) return undefined
                return e.platforms.includes(action.payload)
            })
            return {
                ...state,
                videogames: allplatf
            }
        
        case FILTER_BY_CREATED:
            const allVideogames = state.allVideogames
            // const filterBycreate = action.payload === 'All' ? allVideogames : action.payload === 'Created'? allVideogames.filter(e => e.createInDb) : allVideogames.filter(e => !e.createInDb)
            const filterBycreate = action.payload === 'Created'? 
            allVideogames.filter(e => e.createInDb) : allVideogames.filter(e => !e.createInDb)
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
            const filtrado = action.payload === 'Asc' ? 
            state.videogames.sort((a, b) =>{
                if(a.rating > b.rating) return 1        //true
                if(b.rating > a.rating) return -1
                return 0
            }) :
            state.videogames.sort((a, b) => {
                if(a.rating > b.rating) return -1
                if(b.rating > a.rating) return 1
                return 0
            })

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
                    detail: action.payload          
                }
                case DETAIL_CLEAN:
                    return {
                        ...state,
                        detail: []
                    }
                case GET_NAME:
                    return {
                        ...state,
                        videogames: action.payload
                    }
                case NOT_FOUND:
                    return {
                        ...state,
                        noEncontrado: [action.payload]
                    
                    }
                case EMPTY_ERROR:
                    return {
                        ...state,
                        noEncontrado: []
                    }
                
                case GET_PLATFORMS:
                return {
                    ...state,
                    plataformas: action.payload
                }
        default:
            return state;
    }

};