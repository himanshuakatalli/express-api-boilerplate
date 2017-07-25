"use strict";

const mongoose = require('mongoose');
const Role = mongoose.model('Role');

const E = require('./../error');

module.exports = {

	areValidRoles (roles) {
		if (Array.isArray(roles) && !roles.length)
			throw E.createError(E.getError('RESOURCE_NOT_FOUND'), 'Roles not found');

        if (!roles)
            throw E.createError(E.getError('RESOURCE_NOT_FOUND'), 'Role not found');
		return true;
	}
}