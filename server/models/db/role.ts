const { DataTypes } = require('sequelize');
import sequelize from '../index';

const Role = sequelize.define('role', {
  // 在这里定义模型属性
  label: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  },
  pageList: {
    type: DataTypes.STRING
  },
  disabledComponents: {
    type: DataTypes.STRING
  }
});
export default Role;