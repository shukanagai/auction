const port = 3000;

const dbConfig = {
  host: '3.115.111.52',
  user: 'auction',
  password: 'tokoro',
  database: 'auction'
};

// ローカル
// const dbConfig = {
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'auction'
// };

const userType = {
  student : 0,
  teacher : 1,
  admin : 2
};

module.exports = {
  port,
  dbConfig,
  userType
};