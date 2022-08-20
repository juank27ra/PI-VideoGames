'use strict'
const axios = require ('axios')
require ('dotenv').config()
const {API_KEY} = process.env
// const API_KEY = "dc2bb679db9c4bc496e8858c94efb55f"
const {Videogames, Genres} = require ('../db')
const {Op} = require ('sequelize')

const getApiVideogames = async () => {  
    try{
        let videogames=[];
        let api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
            videogames = videogames.concat(api.data.results);
        for(let i=0;i<4;i++){ 
            api = await axios.get(api.data.next);
            videogames = videogames.concat(api.data.results);
        }
        videogames = videogames.map(e =>{  
            let pedido = {
                id: e.id,
                name: e.name,
                image: e.background_image,
                released: e.released,
                rating: e.rating,
                platforms: e.platforms.map((e) => e.platform.name),
                genres: e.genres.map((e) => e.name),                             // cambio
                description: e.description,
                videogameApi: true,
            };     
            return pedido
        });
        return videogames;
    }catch(err){
        console.log("Error en traer datos desde api");        
    }
}

const getDbVideogames = async () => {
    try{
     return await Videogames.findAll({      
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


    const getId = async (id) => {
        try{
         if (id.length > 10) {                  
            let videogamedb = await Videogames.findAll({  
                include: {
                model: Genres
                },
                where: {id: id}
                })
            let vg = videogamedb.map(e => {
                // e.Genres.forEach(e => console.log("soy el consaole.log", e.dataValues.name, " numero 21"))
                return {
                    name: e.name,        
                    image: e.image,
                    released: e.released,
                    rating: e.rating,
                    platforms: e.platforms,             //
                    genres:  e.genres.map(e => e.dataValues.name),
                    description: e.description,
                    createInDb: e.createInDb  
                }
            }) 

            return vg[0]
            }else{
                let url = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                let videodb = {       
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
            console.log("no se pudo traer el juego por id")      
        }
    }  


   const getApiName = async (name) => {
            let videogames=[];
            let api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
            api.data.results.map(e => {
                 videogames.push(  
                {
                    id: e.id,
                    name: e.name,
                    image: e.background_image,
                    released: e.released,
                    rating: e.rating,
                    platforms: e.platforms.map((e) => e.platform.name),
                    genres: e.genres.map((e) => e),                         
                    description: e.description,
                    videogameApi: true,
                }
            )}
            )
            return videogames;
    }

    const DbVideogames = async (name) => {
        try{
         return await Videogames.findAll({      
            where: {
                name:{
                    [Op.iLike]:`%${name}%`
                }
            },
            include: Genres
         })
        }catch (error) {
         console.log('Error en info Db');
        }  
    }

    const getinfoName = async (name) => {
        const nameDb = await DbVideogames(name)
    const nameApi = await getApiName(name)
    const totalInfo = nameDb.concat(nameApi)
    return totalInfo
    }

    const getPlataformas = async () => {
    try{
        let  platforms =  await getApiVideogames()
    platforms = platforms.map(e => e.platforms).flat()
    platforms =[ ...new Set(platforms.sort())]
    platforms = platforms.map((e, i) => {
        return {
            id: i + 1,
            name: e
        }
    }) 
    return platforms
    }catch(err){
        console.log(err)
    }
    } 

    const deleteid = async (id) => {
    
        const findid = await getId(id)
        await Videogames.destroy({
            where: {
                id: id 
            }
        })
        return `el videogame ${findid.name} ha sido eliminado con exito`
    }

module.exports = {
    getAllInfo,
    getId, 
    getinfoName,
    getPlataformas, 
    deleteid,

}
