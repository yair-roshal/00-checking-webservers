const mysql = require('mysql')
const { sqlConfig } = require('../constants/sql_config')

const pool = mysql.createPool(sqlConfig)

module.exports = function poolConnection(sqlQuery, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if (err) {
                reject(err)
                return
            }

            try {
                const data = await connection.query(sqlQuery, params)
                 console.log('sqlQuery222', sqlQuery)
                connection.release()
                resolve(data)
            } catch (err) {
                console.log('error_poolConnection!!!', err)
                connection.release()
                reject(err)
            }
        })
    })
}

// const mysql = require('mysql')
// const { sqlConfig } = require('../constants/sql_config')
// const pool = mysql.createPool(sqlConfig)

// module.exports = function poolConnection(

//     resolve,
//     reject,
//     sqlQuery,
//     params,
// ) {
//     return pool.getConnection((err, connection) => {
//         if (err) throw err
//         connection.query(sqlQuery, params, (err, data) => {
//             console.log('sqlQuery', sqlQuery)
//             connection.release()
//             if (!err) {
//                 resolve(data)
//             } else {
//                 console.log(
//                     'error_poolConnection!!! ',
//                     // , err
//                 )
//                 // return reject(err)
//             }
//         })
//     })
// }
