const User = require('../models/user');

/**
 * three different ways
 *  1) callback
 *  2) promise
 *  3) async/await
 */

module.exports = {

	 index: (req,res,next) => {
        User.find({},(err,users) => {
        	if (err) {
        		next(err);
        	}
        	res.status(200).json(users);
        })
    },

    addUser: (req,res,next) => {
    	const newUser = new User(req.body);
    	newUser.save((err,user)=>{
    		if (err) {
    			console.log(err);
    			next(err);
    		}
    		res.status(201).json(user);
    	});
    },

    // index1: (req,res,next) => {
    //     User.find({}).then((users)=>{
    //     	res.status(200).json(users);
    //     }).catch(err=>{
    //     	next(err);
    //     });
    // },

    // addUser2: (req,res,next) => {
    // 	const newUser = new User(req.body);
    // 	newUser.save().then(user=>{
    // 		res.status(201).json(user);
    // 	}).catch(err =>{
    // 		next(err);
    // 	})
    // },

    // index3: async (req,res,next)=> {

    // 	try {
    // 		const users = await User.find({});
	   //  	res.status(200).json(users);
    // 	} catch (err) {
    // 		next(err);
    // 	}
    // },

    // addUser3: async (req,res,next) => {
    // 	try {
    // 		const newUser = new User(req.body);
    // 		const user = await newUser.save();
    // 		res.status(201).json(user);
    // 	} catch(err) {
    // 		next(err);
    // 	}
    // }

}