const RequestsService = require('../services/requests.service')

class RequestsController {
    async createRequest(req, res) {
        try {
            await RequestsService.createRequest(req, res)
            res.json({ message: 'Success' })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Server error' })
        }
    }

    async getRequests(req, res) {
        const reqData = {
            web_serv_id: ~~req.params.id,
            limit: -1,
        }

        try {
            const requests = await RequestsService.findAllRequests(reqData, res)
            res.json(requests)
        } catch (err) {
            res.status(500).json({ message: 'Server error' })
        }
    }
}

module.exports = new RequestsController()
