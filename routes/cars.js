var express = require('express');
// var router = express.Router();

var router = require('express-promise-router')();

var CarController =  require('../controllers/car');


// validate
const  { validateParam ,validateBody, schemas } = require('../helpers/routeHelpers');


router.route('/').get(CarController.index)
    .post(validateBody(schemas.userCarSchema),CarController.newCar);

router.route('/:carId')
    .get(validateParam(schemas.idSchema,'carId'),CarController.getCar)
    .put([validateParam(schemas.idSchema,"carId"),validateBody(schemas.putCarSchema)],CarController.updateCar)
    .patch([validateParam(schemas.idSchema,"carId"),validateBody(schemas.patchCarSchema)],CarController.updateCar)
    .delete(validateParam(schemas.idSchema,"carId"),CarController.deleteCar);
    

module.exports = router;
