'use strict'
const axios = require ('axios')
// const {API_KEY} = process.env
// console.log(API_KEY)
// const API_KEY = "8b4736bfe09f49828f6423cdbef6343b"
const {Videogames, Genres} = require ('../db')
const { env } = require ('process');
const e = require('express');
const API_KEY = env.API_KEY
// const {Op} = require('sequelize')

const getApiVideogames = async () => {  
    try{
        let videogames=[];
        let api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
            videogames = videogames.concat(api.data.results);
    // console.log(videogames)
        for(let i=0;i<4;i++){ //te trae los 100 juegos + toda la data innecesaria 
            api = await axios.get(api.data.next);
            videogames = videogames.concat(api.data.results);
            // console.log(videogames)
        }
        videogames = videogames.map(e =>{   //aquí limpiamos para que los datos solo tengan la info que necesito.
            let pedido = {
                id: e.id,
                name: e.name,
                image: e.background_image,
                released: e.released,
                rating: e.rating,
                platforms: e.platforms.map((e) => e.platform.name),
                genres: e.genres.map((e) => e.name),
                description: e.description,
                videogameApi: true,
            }; 
                
            return pedido
        });
        // console.log(videogames)
        return videogames;
    }catch(err){
        console.log("Error en traer datos desde api");       // (err)    
    }
}
// console.log(getApiVideogames())


const getDbVideogames = async () => {
    try{
     return await Videogames.findAll({      //Busque varias instancias. o encuentre todo que
         include: {
             model: Genres,
             attributes: ["name"],
             through: {                     //mediante
                attributes: [],
             }
         }
     })
    }catch (error) {
     console.log('Error en info Db');
   }  
 }
    // console.log(getDbVideogames())

 const getAllInfo = async () => {
     try {
         const infoApi = await getApiVideogames();
         const infoDb = await getDbVideogames();
         const infoTotal = infoApi?.concat(infoDb)
         return infoTotal 
     } catch (error) {
          console.log('Error en info total');
        }
      };
    //   console.log(getAllInfo())
 
    const getId = async (id) => {
        try{
            // let x = {id: id}
            // let y = id.length
         if (id.length > 10) {                  //videogame creados con uuid 
            //  console.log("soy el If")
         let videogamedb = await Videogames.findAll({  
               include: {
                 model: Genres
               },
               where: {id: id}
                })
             let vg = videogamedb.map(e => {
                return {
                    name: e.name,        
                    image: e.image,
                    released: e.released,
                    rating: e.rating,
                    platforms: e.platform,
                    genres: e.genres,
                    description: e.description  
                }
             })
             return vg                   
            }else{
                // console.log("soy el else")
                 let url = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                 let videodb = {        //[]                 videogame de la Api
                    name: url.data.name,
                    id: url.data.id,
                    image: url.data.background_image,
                    description: url.data.description_raw,
                    released: url.data.released,
                    rating: url.data.rating,
                    platforms: url.data.parent_platforms.map(e => e.platform.name),
                    genres: url.data.genres.map(e => e.name)
                }
                return videodb
            }
        }catch(err){
             console.log("no se pudo traer el juego por id")       //()
        }
    }  
// console.log(getId("3498"))

    // router.get('/:id', async(req, res, next) =>{
    //     try {
    //         const {id} = req.params
    
    //             const apiDataId = await axios.get(https://api.rawg.io/api/games/${id}?key=751305d507034a729a0f5ece9c3c8c6f)
    //             console.log(apiDataId)
    //             const gamexid = ({
    //                             name:apiDataId.data.name,
    //                             image: apiDataId.data.background_image,
    //                             description: apiDataId.data.description,
    //                             platforms: apiDataId.data.parent_platforms.map(plat => plat.platform.name),
    //                             genres: apiDataId.data.genres.map(gen => gen.name),
    //                             released: apiDataId.data.released,
    //                             rating: apiDataId.data.rating
    //             })
    //             apiDataId?
    //             res.status(200).json(gamexid):
    //             res.status(404).send('no hay juegos con ese id')
    //     } catch (error) {
    //         next(error)
    //     }
    // })
    // console.log(getId())


 module.exports = {
     getAllInfo,
     getId

 }