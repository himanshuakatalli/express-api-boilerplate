"use strict";

module.exports = {

    appendAPIVersion(version) {

    	return function (req, res, next) {
            res._json = res.json;
            res.json = function (data) {

                if (version)
                    data['APIVersion'] = version;

                res._json(data);
            };
            next();
        }
    },
    
    ok (res, data) {
        res.status(200).json({
            data,
            success: true
        });
    },

    created (res, data) {
        res.status(201).json({
            data,
            success: true
        });
    },

    deleted (res, data) {
        res.status(200).json({
            data,
            success: true
        });
    },

    modified(res, data) {
        res.status(200).json({
            data,
            success: true
        });
    },

    error(res, err) {
        res.status(err.status).send({
			"error": {
			    code: err.code,
                message: err.message,
				stack: err.stack || '',
            },
			success: false
        });
    }
};