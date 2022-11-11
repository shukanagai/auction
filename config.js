const port = 3000;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'manabo_chat'
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