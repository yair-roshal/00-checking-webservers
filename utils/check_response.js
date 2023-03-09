const axios = require('axios')

module.exports = async function checkResponse(url) {
    console.log('url111=', url)

    try {
        const res = await axios.get(url)
        console.log(`Status code: ${res.status}`)
        return res.status
    } catch (err) {
        if (err.response) {
            console.error(
                `err.response.status_checkResponse:  ${err.response.status}`,
            )
            throw err
        } else {
            console.error(`err.message_checkResponse:  ${err.message}`)
            throw err
        }
    }
}
 