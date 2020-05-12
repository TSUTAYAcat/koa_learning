// mysql/index.js

const pool = require('./pool');

class UpdateCategory {
  constructor() {
  }
  // 获取分类列表
  getCategoryList(param) {
    const { level = 1, parent_id = 0 } = param
    console.log(level, parent_id,parent_id && parent_id !== '0')
    let sql
    if (parent_id && parent_id !== '0') {
      sql = `select * from categorylist where level = ${level} and parent_id = ${parent_id} `
    } else {
      sql = `select * from categorylist where level = ${level} `
    }

    console.log(sql)
    return new Promise((resolve, reject) => {
      pool.query(sql, function (error, results, fields) {
        if (error) {
          throw error
        };
        resolve(results)
      });
    })
  }
  // 获取分类详情
  getCategoryDetail(param) {
    const { id = 1 } = param
    let sql = `select * from categorylist where id = ${id}  `
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
  //   joinUs(param) {
  //     const { username, password } = param
  //     if (username && password) {
  //       let sql = `INSERT INTO myblog.user (username, password) VALUES ('${username}', '${password}');`
  //       return new Promise((resolve, reject) => {
  //         pool.query(sql, function (error, results, fields) {
  //           if (error) {
  //             throw error
  //           };
  //           resolve(results)
  //         });
  //       })
  //     } else {
  //       return { msg: 'check your input', failed: true, data: null }
  //     }

  //   }
}

module.exports = new UpdateCategory()
