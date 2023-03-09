const poolConnection = require('../utils/pool_connection')
const { TABLE_NAME_REQUESTS } = require('../constants/constants')

class RequestsService {
    async createRequest(req, res) {
        const sqlQuery = `INSERT INTO ${TABLE_NAME_REQUESTS} SET ?`
        try {
            await poolConnection(sqlQuery, req)
        } catch {
            console.log('error_createRequest')
        }
    }

    async findAllRequests(req, res) {
        console.log('req1111', req)
        const { web_serv_id, limit } = req
        const sqlQuery = `SELECT * from ${TABLE_NAME_REQUESTS} WHERE web_serv_id = ? ${
            limit == -1 ? '' : 'LIMIT = ?'
        }     `
        console.log('findAllRequests__sqlQuery', sqlQuery)
        console.log('findAllRequests__web_serv_id, limit', web_serv_id, limit)
        try {
            result = await poolConnection( sqlQuery, [
                web_serv_id,
                limit,
            ])
            console.log('result_findAllRequests', result)
            return result
        } catch (err) {
            // console.error('error_findAllRequests')
            console.error(err)
        }
    }
}

module.exports = new RequestsService()
