const axios = require('axios');
const {Genres} = require ('../db')
const API_KEY = "8b4736bfe09f49828f6423cdbef6343b"


const getGenresApi = async () => {
try{
    const allGenres = [];
    let apiUrl= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)           
        // let apiData = await axios.get(apiUrl);
         apiUrl = apiUrl.data.results.map(e => {
            return allGenres.push({
                name: e.name,
                id: e.id
            })
        })
    await Genres.bulkCreate(allGenres);      //crea e inserta varias instancias de forma masiva
    // console.log(allGenres)
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
    console.log(allGenres)
    return gen
}
// console.log(getInfoDb())

module.exports = {
    getGenresApi,
    getInfoDb
}
