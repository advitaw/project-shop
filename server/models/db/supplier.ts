const { DataTypes } = require('sequelize');
import sequelize from '../index';

const supplier = sequelize.define('supplier', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    address: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    linkman: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.NUMBER
    },
});
export default supplier;