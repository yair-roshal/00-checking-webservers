let INTERVAL
if (process.env.NODE_ENV === 'dev') {
    console.log('INTERVAL checking for development =', 6, 'sec ')
    INTERVAL = 6 * 1000 //6 sec
}
if (process.env.NODE_ENV === 'prod') {
    console.log('INTERVAL checking for production =', 60, 'sec ')
    INTERVAL = 60 * 1000 //60 sec
}

const N_SUCCESSES_RECORDS = 5
const N_FAILURES_RECORDS = 3

const TABLE_NAME_WEBSERVERS = 'webservers'
const TABLE_NAME_REQUESTS = 'requests'

module.exports = {
    INTERVAL,
    N_SUCCESSES_RECORDS,
    N_FAILURES_RECORDS,
    TABLE_NAME_WEBSERVERS,
    TABLE_NAME_REQUESTS,
}
