const User = require('../models/user');
const Car = require('../models/car');


module.exports = {

    index: async (req, res ,next) => {
        const cars = await Car.find({});
        res.status(200).json(cars);
    },

    newCar: async (req,res,next)=> {
        
        const seller = await User.findById(req.value.body.seller); // 这里就是用户id

        const newCar = req.value.body;
        delete newCar.seller; // 这里传出的是传入的seller

        const car =  new Car(newCar);
        car.seller = seller;  // 这里就是user对象了
        await car.save();

        seller.cars.push(car);
        await seller.save();

        res.status(201).json(car);
    },
    getCar: async (req,res,next) => {
        const { carId } = req.value.params;
        const car =  await Car.findById(carId);
        res.status(200).json(car);
    },

    updateCar: async (req,res,next) => {
        const { carId } = req.value.params;
        const newCar = req.value.body;

        const result =  await Car.findByIdAndUpdate(carId,newCar);
        console.log(result); // 返回的是对象car
        res.status(200).json({"success":true});
    },

    deleteCar: async (req,res,next) => {
        const { carId } = req.value.params;

        const car  = await Car.findById(carId);
        if(!car) {
            res.status(404).json({ error : "Car doest\'s exist"});
        }
        const sellerId = car.seller;

        const seller = await User.findById(sellerId)

        await car.remove();

        seller.cars.pull(car);
        await seller.save();

        res.status(200).json({success:true});
    },
};