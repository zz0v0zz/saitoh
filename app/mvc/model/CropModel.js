//const mysql = require('mysql');
//const db = require('../../config/db');
//const table = 'crop';
//
//module.exports = {
//  getCrop: function() {
//    return new Promise((resolve, reject) => {
//      const con = mysql.createConnection(db);
//      con.query(
//        `select crop_name from ${table}`,  (err, result, fields) => {
//          if(err) {
//            reject(err);
//          } else {
//            resolve(result);
//          }
//        });
//      con.end();
//    })
//  }
//}
