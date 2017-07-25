"use strict";

const PREDEFINED_ERRORS = {
	"ValidationError": {
		"code": "E_DATA_INVALID",
		"status": 500,
		"message": "Supplied data did not pass the validation check"
	},
	"MongoError": {
		"code": "E_DB_ERROR",
		"status": 500,
		"message": "Error while processing db query"
	}
};

const CUSTOM_ERRORS = {
    "EMAIL_DATA_INVALID": {
        "code": "E_EMAIL_DATA_INVALID",
        "status": 500,
        "message": "Email data to be sent doesn't pass the validation check"
    },
    "METHOD_NOT_OVERRIDDEN": {
       "code": "E_METHOD_NOT_OVERRIDDEN",
       "status": 500,
       "message": "Abstract class method need to overridden in extending class"
    },
    "SERVICE_CONFIG_UNDEFINED": {
        "code": "E_SERVICE_CONFIG_UNDEFINED",
        "status": 500,
        "message": "Service configuration is not defined"
    },
	"UNSUPPORTED_STRATEGY": {
		"code": "E_UNSUPPORTED_STRATEGY",
		"status": 500,
		"message": "Strategy requested is not supported"
	},
	"DUPLICATE_RESOURCE": {
		"code": "E_DUPLICATE_RESOURCE",
		"status": 500,
		"message": "Resource is already present"
	},
	"BAD_REQUEST": {
		"code": "E_BAD_REQUEST",
		"status": 400,
		"message": "Request is malformed"
	},
	"INTERNAL_SERVER_ERROR": {
		"code": "E_INTERNAL_SERVER_ERROR",
		"status": 500,
		"message": "Something bad happened"
	},
	"INVALID_TOKEN": {
		"code": "E_INVALID_TOKEN",
		"status": 401,
		"message": "Token provided is invalid"
	},
	"INVALID_JWT_OPTION": {
		"code": "E_INVALID_JWT_OPTION",
		"status": 500,
		"message": "Specified JWT option is not valid"
	},
	"ACTIVE_APIS_NOT_DEFINED": {
		"code": "E_ACTIVE_APIS_NOT_DEFINED",
		"status": 500,
		"message": "Please specify ACTIVE_API key in .env file"
	},
	"API_ROUTER_NOT_FOUND": {
		"code": "E_API_ROUTER_NOT_FOUND",
		"status": 500,
		"message": "Router for the API requested hasn't been implemented yet"
	},
	"UNSUPPORTED_ROUTER_HANDLERS": {
		"code": "E_UNSUPPORTED_ROUTER_HANDLERS",
		"status": 500,
		"message": "Router handlers must be of type function"
	},
	"ROUTER_NOT_DEFINED": {
		"code": "E_ROUTER_NOT_DEFINED",
		"status": 501,
		"message": "Router hasn't been implemented yet"
	},
	"SEEDER_NOT_DEFINED": {
		"code": "E_SEEDER_NOT_DEFINED",
		"status": 501,
		"message": "Seeded hasn't been implemented yet"
	},
	"RESOURCE_NOT_FOUND": {
		"code": "E_RESOURCE_NOT_FOUND",
		"status": 404,
		"message": "Reqeusted resource not found"
	},
	"CREDENTIALS_INCORRECT": {
		"code": "E_USER_NOT_FOUND",
		"status": 401,
		"message": "Provided credentials are incorrect"
	}
};

module.exports = {
	PREDEFINED_ERRORS,
	CUSTOM_ERRORS
};