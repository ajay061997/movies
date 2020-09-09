const { Router } = require('express');

const router = Router();

const movieController = require('../controller/movieController');

router.get('/getAllMovies', movieController.getAllMovies);
router.post('/getOneMove', movieController.getOneMovie);
router.post('/addMovie', movieController.addMovie);
router.put('/updateOneMove', movieController.updatedOneMovie);
router.delete('/deleteOneMove', movieController.deleteOneMovie);


module.exports = router;