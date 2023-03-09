const WebserversService = require('../services/webservers.service')

class WebserversController {
    async createWebserver(req, res) {
        try {
            await WebserversService.createWebserver(req.body)
            res.json({ message: 'Webserver created' })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Webserver error' })
        }
    }

    async getWebserverById(req, res) {
        const { id } = req.params
        try {
            const webserver = await WebserversService.getWebserverById(id)
            if (webserver == null || webserver.length == 0) {
                return res.status(404).json({ message: 'Webserver not found' })
            }
            res.json(webserver)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    async updateWebserver(req, res) {
        const { id } = req.params
        const { name, uri, status } = req.body
        try {
            const webServer = await WebserversService.getWebserverById(id)
            if (!webServer) {
                return res.status(404).json({ message: 'Webserver not found' })
            }

            await WebserversService.updateWebserver({ id, name, uri, status })
            res.json({ message: 'Webserver updated' })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Webserver error' })
        }
    }

    async deleteWebserver(req, res) {
        const { id } = req.params
        try {
            const webServer = await WebserversService.getWebserverById(id)
            if (!webServer) {
                return res.status(404).json({ message: 'Webserver not found' })
            }
            await WebserversService.deleteWebserver(id)
            res.json({ message: 'Webserver deleted' })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Webserver error' })
        }
    }

    async getWebservers(req, res) {
        try {
            const webServers = await WebserversService.findAllWebservers()
            res.json(webServers)
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Webserver error' })
        }
    }
}

module.exports = new WebserversController()
