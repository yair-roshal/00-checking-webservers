const express = require('express'),
    router = express.Router(),
    webserversRoutes = require('./webservers.routes')

router.use('/', webserversRoutes)

module.exports = router
