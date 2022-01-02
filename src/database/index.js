require('dotenv').config();

const db = require('knex')({
    client: 'mysql',
    connection: {
      // host : '127.0.0.1',
      // host : 'noolim-project.cdhxtabtekrk.ap-northeast-2.rds.amazonaws.com',
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      port : 3306,
      password : process.env.DB_PASSWORD,
      database : 'board_db',
      timezone: 'KST'
    },
  });

  
  module.exports = db;