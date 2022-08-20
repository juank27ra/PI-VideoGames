const axios = require('axios');
const {Genres} = require ('../db')
// const API_KEY = "dc2bb679db9c4bc496e8858c94efb55f"


const getGenresApi = async () => {
try{
    const allGenres = [];
    let apiUrl= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)           
        apiUrl = apiUrl.data.results.map(e => {
            return allGenres.push({
                name: e.name , 
                id: e.id
            })
        })
    await Genres.bulkCreate(allGenres);      //crea e inserta varias instancias de forma masiva
    return allGenres
        }catch(error){
    console.log(error);
    }
}

const getInfoDb = async () => {
    const allGenres = await Genres.findAll()
    const gen = allGenres.map(e => {
        return {
            id: e.id,
            name: e.name
        }
    })
    return gen
}


module.exports = {
    getGenresApi,
    getInfoDb
}
