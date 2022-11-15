const port = 3000;

const dbConfig = {
  host: process.env.DB_HOST | '3.115.111.52',
  user: process.env.DB_USER | 'auction',
  password: 'tokoro',
  database: 'auction'
};

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