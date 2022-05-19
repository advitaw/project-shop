const Sequelize = require('sequelize');

console.log('run')
// 创建数据库连接池
const sequelize = new Sequelize({
  database: 'shop',
  dialect: 'mysql',
  username: 'root',
  password: '123456',
  host: '127.0.0.1',
  port: 8889,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
// 验证连接
sequelize.authenticate()
  .then((/* err */) => {
    console.log('----------------------------------------');
    console.log('DATABASE √');
  })
  .catch((err: any) => {
    console.log('Unable to connect to the database:', err);
  });

export default sequelize;

