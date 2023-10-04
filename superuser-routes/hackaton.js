const hackatonController = require('../superuser-controller/hackaton');
const { authRole } = require('../utils/authRole');
const hackatonRouter = require('express').Router();

hackatonRouter.post('/create-hackaton', authRole, hackatonController.createHackaton )

module.exports = hackatonRouter