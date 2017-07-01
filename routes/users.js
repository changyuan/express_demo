var express = require('express');
// var router = express.Router();

var router = require('express-promise-router')();

var UsersController =  require('../controllers/user');


// validate
const  { validateParam ,validateBody, schemas } = require('../helpers/routeHelpers');


router.route('/').get(UsersController.index3)
                .post(validateBody(schemas.userSchema),UsersController.addUser3);

router.route('/:userId')
    // 这里的回调是可以很多个的。这里可以是中间件或钩子或其他
    .get(validateParam(schemas.idSchema,'userId'),UsersController.getUser)  
    .patch([validateParam(schemas.idSchema,'userId'),validateBody(schemas.userOptionalSchema)],UsersController.replaceUser)
    .put([validateParam(schemas.idSchema,'userId'),validateBody(schemas.userSchema)],UsersController.replaceUser)
    .delete(validateParam(schemas.idSchema,'userId'),UsersController.delUser);

router.route('/:userId/cars')
    .get(validateParam(schemas.idSchema,'userId'),UsersController.getUserCars)
    .post([validateParam(schemas.idSchema,'userId'),validateBody(schemas.carSchema)],UsersController.updateUserCar);
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
