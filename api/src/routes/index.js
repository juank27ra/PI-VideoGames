const { Router } = require('express');
const videogamesRoutes = require('./videogames')
const genresRouter = require('./genres')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogamesRoutes )
router.use('/videogame', videogamesRoutes ) //id
router.use('/genres', genresRouter)

module.exports = router;
