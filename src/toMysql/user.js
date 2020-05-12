// mysql/index.js

const pool = require('./pool'); 

class UpdateUser {
  constructor() {
  }
   // 登录
   login(param) {
    const { username, password } = param
    let sql = `select * from user where username = '${username}' and password = '${password}'`
    return new Promise((resolve, reject) => {
      pool.query(sql, function (error, results, fields) {
        if (error) {
          throw error
        };
        resolve(results)
      });
    })

  }
  
  // 注册
  joinUs(param) {
    const { username, password } = param
    if (username && password) {
      let sql = `INSERT INTO myblog.user (username, password) VALUES ('${username}', '${password}');`
      return new Promise((resolve, reject) => {
        pool.query(sql, function (error, results, fields) {
          if (error) {
            throw error
          };
          resolve(results)
        });
      })
    } else {
      return { msg: 'check your input', failed: true, data: null }
    }

  }
}

module.exports = new UpdateUser()
