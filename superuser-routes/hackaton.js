const hackatonController = require('../superuser-controller/hackaton');
const { authRole } = require('../utils/authRole');
const authenticateToken = require('../utils/authToken');
const hackatonRouter = require('express').Router();

hackatonRouter.post('/create-hackaton', authRole, authenticateToken,  hackatonController.createHackaton )

module.exports = hackatonRouter