const Joi = require("joi");


module.exports = {

    //下面的两个方法,req.params 和body 都 重新放到req.value下面的params,body，这样来区分是这里赋值新的中间件，还是原来的参数
    validateParam : (schema, name) => {
        return (req, res, next) => {
            const result = Joi.validate({param: req['params'][name],schema});
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                // 新的
                if (!req.value) 
                    req.value = {};

                if (!req.value['params']) 
                    req.value['params'] = {};
                    
                req.value['params'][name] = result.value.param; // 这里的param对应的joi vaidate中的params ：9
                next(); //执行下一个回调
            }
        };
    },

    validateBody : (schema) => {
        return  (req, res, next)=>{
            const result = Joi.validate(req.body,schema);
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value) 
                    req.value = {};

                if (!req.value['body']) 
                    req.value['body'] = {};

                req.value['body'] = result.value;
                next();
            }
        };
    },

    schemas: {
        idSchema : Joi.object().keys({
            userId : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        userSchema: Joi.object().keys({
            name : Joi.string().required(),
            gender : Joi.number().integer().min(0).max(2).required(),
            email : Joi.string().email().required(),
            is_del: Joi.boolean(),
        }),

        //当为非必须的时候
        userOptionalSchema: Joi.object().keys({
            name : Joi.string(),
            gender : Joi.number().integer().min(0).max(2),
            email : Joi.string().email(),
            is_del: Joi.boolean(),
        }),

        userCarSchema: Joi.object().keys({
            make : Joi.string().required(),
            model : Joi.string().required(),
            year : Joi.required(),
        }),

        putCarSchema: Joi.object().keys({
            make : Joi.string().required(),
            model : Joi.string().required(),
            year : Joi.required(),
        }),
        patchCarSchema: Joi.object().keys({
            make : Joi.string(),
            model : Joi.string(),
            year : Joi.number().integer(),
        }),


        carSchema: Joi.object().keys({
            seller: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            make : Joi.string().required(),
            model : Joi.string().required(),
            year : Joi.required(),
        }),
    },
};