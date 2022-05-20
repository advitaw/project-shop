const { DataTypes } = require('sequelize');
import sequelize from '../index';

const rule = sequelize.define('rule', {
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
    limit: {
        type: DataTypes.STRING
    },
    dec: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.NUMBER
    },
});
export default rule;