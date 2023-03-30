require('dotenv').config({ path: './.env' })
const express = require('express')
const app = express()
app.use(express.json())

const router = require('./routes/index')
const axios = require('axios')
app.use('/', router)

const WebserversService = require('./services/webservers.service')
const RequestsService = require('./services/requests.service')

const {
    N_FAILURES_RECORDS,
    N_SUCCESSES_RECORDS,
    INTERVAL,
} = require('./constants/constants')
// const checkResponse = require('./utils/check_response')

// const host = 'localhost'
// const port = '5000'
// const port = '8889'

const host = process.env.HOST
const port =  5000
// const port = process.env.PORT || 5000

async function checkCodeResponse(webServer) {
    let isStatusOk = false

    try {
        await axios
            .get(webServer.uri)
            .then((response) => {
                if (response.status === 200) {
                    console.log('Request successful!')
                    isStatusOk = true
                    console.log('isStatusOk222', isStatusOk)
                    return isStatusOk
                } else if ([301, 302].includes(response.status)) {
                    const redirectUrl = response.headers.location
                    console.log(`Redirecting to ${redirectUrl}`)
                } else if ([400, 401].includes(response.status)) {
                    console.log(
                        'Client error - request was incorrect or invalid',
                    )
                } else if ([500, 502].includes(response.status)) {
                    if (response.headers['retry-after']) {
                        const delaySeconds = parseInt(
                            response.headers['retry-after'],
                            10,
                        )
                        console.log(
                            `Server error - please try again in ${delaySeconds} seconds`,
                        )
                    } else {
                        console.log('Server error - please try again later')
                    }
                }
            })
            .catch((error) => {
                console.error(
                    'error_axios.get() with response.status=== ' +
                        error.response.status,
                )
            })
    } catch (error) {
        // console.error(`Error: ${error}`);
        console.error(`Error_checkCodeResponse`)
    }

    return isStatusOk
}

async function createRequestFunc(
    webServer,
    isStatusOk,
    latency,
    created,
    createdNormal,
) {
    try {
        await RequestsService.createRequest({
            web_serv_id: webServer.id,
            nameServer: webServer.name,
            status: isStatusOk ? 'success' : 'fail',
            latency,
            created,
            createdNormal,
        })
        console.log(` request for webserver ${webServer.name} was created `)
    } catch (error) {
        // console.error(`Error: ${error}`);
        console.error(`Error_createRequestFunc `)
    }
}

async function findAllRequestsFunc({ web_serv_id, limit }) {
    try {
        const requests = await RequestsService.findAllRequests({
            web_serv_id,
            limit,
        })
        // console.log('requests222', requests)
        return requests
    } catch (error) {
        // console.error(`Error: ${error}`);
        console.error(`Error_findAllRequestsFunc: `)
    }
}

//MAIN------------------------------

setInterval(async () => {
    
    console.log('11111')
    const webServers = await WebserversService.findAllWebservers()
    console.log('22222')
    webServers.forEach(async (webServer) => {
        let isStatusOk = false
        const created = Date.now()
        const createdNormal = Date(Date.now()).toString()
        console.log('______webServer_____=', webServer)

        result = checkCodeResponse(webServer)
        const latency = Date.now() - created

        if (result && latency < 60000) {
            isStatusOk = true
        }

        createRequestFunc(
            webServer,
            isStatusOk,
            latency,
            created,
            createdNormal,
        )

        console.log('webServer.id', webServer.id)
        const requests = findAllRequestsFunc({
            web_serv_id: webServer.id,
            limit: N_SUCCESSES_RECORDS,
        }).then((res) => console.log('res333', res))
        // console.log('requests333', requests)

        const nSuccesses = requests.filter(
            (req) => req.status == 'success',
        ).length

        if (nSuccesses >= N_SUCCESSES_RECORDS) {
            const webServerNewStatus = { ...webServer, status: 'Healthy' }
            await WebserversService.updateWebserver(webServerNewStatus)
            console.log('webServerNewStatus', webServerNewStatus)
        } else {
            const requests = await RequestsService.findAllRequests({
                web_serv_id: webServer.id,
                limit: N_FAILURES_RECORDS,
            })

            const nFailures = requests.filter(
                (req) => req.status == 'fail',
            ).length

            if (nFailures >= N_FAILURES_RECORDS) {
                const webServerNewStatus = {
                    ...webServer,
                    status: 'Unhealthy',
                }
                await WebserversService.updateWebserver(webServerNewStatus)
                console.log('webServerNewStatus', webServerNewStatus)
            }
        }
    })
}, INTERVAL)

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`),
)
