const User = require('../models/user');
const Car = require('../models/car');

/**
 * three different ways
 *  1) callback
 *  2) promise
 *  3) async/await
 */

module.exports = {

	index: (req, res, next) => {
		User.find({}, (err, users) => {
			if (err) {
				next(err);
			}
			res.status(200).json(users);
		})
	},

	addUser: (req, res, next) => {
		const newUser = new User(req.body);
		newUser.save((err, user) => {
			if (err) {
				console.log(err);
				next(err);
			}
			res.status(201).json(user);
		});
	},

	index1: (req, res, next) => {
		User.find({}).then((users) => {
			res.status(200).json(users);
		}).catch(err => {
			next(err);
		});
	},

	addUser2: (req, res, next) => {
		const newUser = new User(req.body);
		newUser.save().then(user => {
			res.status(201).json(user);
		}).catch(err => {
			next(err);
		})
	},

	index3: async(req, res, next) => {

		try {
			const users = await User.find({});
			res.status(200).json(users);
		} catch (err) {
			next(err);
		}
	},

	addUser3: async(req, res, next) => {
		// 这里如果用var router = express.Router(); 需要catch异常；
		// var router = require('express-promise-router')(); 引用这个的时候就不用， 会自动捕捉异常
		try {
			console.log(req.value);

			// const newUser = new User(req.body);
			const newUser = new User(req.value.body); //增加验证之后的
			const user = await newUser.save();
			res.status(201).json(user);
		} catch (err) {
			next(err);
		}
	},

	getUser: async(req, res, next) => {
		// new way
		console.log(req.value);
		const { userId } = req.value.params; 
		
		// old way
		// const { userId } = req.params;
		console.log(userId);
		
		const users = await User.findById(userId);
		res.status(200).json(users);
	},

	replaceUser: async(req, res, next) => {
		const {
			userId
		} = req.value.params;
		const newUser = req.value.body;
		const result = await User.findByIdAndUpdate(userId,newUser);
		res.status(200).json(result);
	},
	delUser: async(req, res, next) => {
		const {
			userId
		} = req.params;
		const users = await User.findByIdAndRemove(userId);
		res.status(200).json(users);
	},

	getUserCars: async(req, res, next) => {
		const {
			userId
		} = req.value.params;
		const user = await User.findById(userId).populate("cars");
		res.status(200).json(user.cars);
	},

	updateUserCar: async(req, res, next) => {
		const {
			userId
		} = req.value.params;

		const newCar =  new Car(req.value.body);
		const user = await User.findById(userId);
		newCar.seller = user;
		await newCar.save();
		
		user.cars.push(newCar);
		await user.save();

		res.status(201).json(newCar);
	},
}