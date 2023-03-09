let INTERVAL
if (process.env.NODE_ENV === 'dev') {
    console.log('INTERVAL=', 6)
    INTERVAL = 6 * 1000 //6 sec
}
if (process.env.NODE_ENV === 'prod') {
    console.log('INTERVAL=', 60)
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
