const { DataTypes } = require('sequelize');
import sequelize from '../index';

const User = sequelize.define('user', {
  // 在这里定义模型属性
  name: {
    type: DataTypes.STRING,
    // allowNull 默认为 true
  },
  password: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  },
  nickName: {
    type: DataTypes.STRING
  },
  shopName: {
    type: DataTypes.STRING
  },
  workTime: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  },
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING
  }
});
export default User;