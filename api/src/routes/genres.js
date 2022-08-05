const express = require ('express');
const { Genres } = require('../db')
const {getInfoDb}= require('../controlers/genres')
// const {getGenresApi} = require('../controlers/genres')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const genres = await getInfoDb()
        genres?
        res.status(200).send(genres) :
        res.status(404).send('No hay generos que mostrar')
    }catch(err){
        next(err)
    }

})

module.exports = router;