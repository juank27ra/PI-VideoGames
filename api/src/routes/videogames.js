const express = require ('express');
const {getAllInfo, getId, getinfoName, getPlataformas} = require ('../controlers/videogame')
const { Videogames, Genres} = require('../db')

const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
    const {name} = req.query                        
         let videogamesTotal = await getAllInfo();
    if(name){
        let videogamesName = videogamesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))//
       videogamesName.length?// videogamesName.length.slice(0, 15) ?                                     //slice
        res.status(200).send(videogamesName.slice(0, 15)) : 
        res.status(404).send({info:'El videogames no existe'});                                     // aqui imagen
    }else{
        res.json(videogamesTotal);
        // res.status(404).send("No existe VideoGames con este ${name}");
    }
    } catch (error) {
        console.log(error, "no se pueden traer los videogames")
        // next()
      }
});

router.post('/', async (req, res) => {
    const { name, image, released, rating, platforms, genres, description} = req.body
console.log(req.body)
    try{
        var change= platforms.toString()
        const newVideogame = await Videogames.create({                                   //create   findOrCreate
            name,
            image,
            released,
            rating,
            platforms: change, 
            genres,
            description, 
            createInDb: true
        })
        const genresDb = await Genres.findAll({
            where: {name : genres}
        })
        newVideogame.addGenres(genresDb)
        res.status(200).send('El videogame fue creado exitosamente😊')
    }catch(error){
        // next()
        console.log(error)
    }
})

router.get('/name', async (req, res) => {
    try {
        const {name} = req.query                        
             let videogamesTotal = await getinfoName(name);
            // let videogamesName = videogamesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))//
           videogamesTotal.length?
            res.status(200).send(videogamesTotal.slice(0, 15)) :
            res.status(404).send(`videogame ${name} No encontrado`);                                     // aqui imagen
        } catch (error) {
            console.log(error, "no se pueden traer los videogames")
       
          }
       
})

router.get('/platforms', async (req, res) => {
    const platf = await getPlataformas()
    platf? 
    res.status(200).send(platf):
    res.status(404).send('la plataforma no fue traida de la Api')
})


router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    try {
        const videogameId = await getId(id)
            // videogameId.length ?
            videogameId?
            res.status(200).json(videogameId) :
            res.status(404).send('Id no encontrado 😥')

    } catch (error) {
        next()
    }
})



module.exports = router;




// server.delete('/posts', (req, res) => {
//     const { id } = req.body;

//     if(!id){
//         return res.status(STATUS_USER_ERROR).json({error: "no hay id"})
//     }
//     const post = posts.find(p => p.id === id)

//     if(!post){
//         return res.status(STATUS_USER_ERROR).json({error: "post encontrado"})
//     }
//     posts = posts.filter(p => p.id !== id)

//     res.json({ success: true })

// })
//------------------
// server.delete('/author', (req, res) => {
//     const { author } = req.body;
//     console.log(req)

//     if(!author){
//         return res.status(STATUS_USER_ERROR).json({error: "error"})
//     }
//     const pos = posts.filter(p => p.author === author)

//     if(!pos.length){
//         return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
//     }

//     posts = posts.filter(p => p.author !== author)


//     res.json(pos)

// })
//--------------------
// server.put('/posts', (req, res) => {
//     const {id, title, contents} = req.body;

//     if(!id || !title || !contents){
//         return res.status(STATUS_USER_ERROR)
//         .json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
//     }

//     const post = posts.find(p => p.id === id)

//     if(!post){
//         return res.status(STATUS_USER_ERROR)
//         .json({error: "No hay id que corresponda con un post valido"})
//     }

//     post.title = title;
//     post.contents = contents;

//     res.json(post)

// })