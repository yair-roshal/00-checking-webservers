const express = require('express')
const router = express.Router()
const WebserverController = require('../controllers/webservers.controller')
const RequestsController = require('../controllers/requests.controller')

router
    .route('/webservers/:id')
    .get(WebserverController.getWebserverById)
    .put(WebserverController.updateWebserver)
    .delete(WebserverController.deleteWebserver)

router
    .route('/webservers')
    .post(WebserverController.createWebserver)
    .get(WebserverController.getWebservers)

router
    .route('/webservers/:id/requests')
    .post(RequestsController.createRequest)
    .get(RequestsController.getRequests)

module.exports = router
