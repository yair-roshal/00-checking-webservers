const poolConnection = require('../utils/pool_connection')
const { TABLE_NAME_WEBSERVERS } = require('../constants/constants')

class WebserversService {
    findAllWebservers(req, res) {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * from ${TABLE_NAME_WEBSERVERS}`
            poolConnection(req, res, resolve, reject, sqlQuery)
        })
    }

    getWebserverById(req, res) {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * from ${TABLE_NAME_WEBSERVERS} WHERE id = ?`
            poolConnection(req, res, resolve, reject, sqlQuery, [req])
        })
    }

    createWebserver(req, res) {
        return new Promise((resolve, reject) => {
            const sqlQuery = `INSERT INTO ${TABLE_NAME_WEBSERVERS} SET ?`

            const webserver = {
                name: req.name,
                uri: req.uri,
                status: '',
            }

            poolConnection(req, res, resolve, reject, sqlQuery, webserver)
        })
    }

    updateWebserver(req, res) {
        return new Promise((resolve, reject) => {
            const { id, name, uri, status } = req
            const sqlQuery = `UPDATE ${TABLE_NAME_WEBSERVERS} SET name = ?,  uri = ?,  status = ?  WHERE id = ?`
            poolConnection(req, res, resolve, reject, sqlQuery, [name, uri, status, id])
        })
    }

    deleteWebserver(req, res) {
        return new Promise((resolve, reject) => {
            const sqlQuery = `DELETE from ${TABLE_NAME_WEBSERVERS} WHERE id = ?`
            poolConnection(req, res, resolve, reject, sqlQuery, [req])
        })
    }
}

module.exports = new WebserversService()
