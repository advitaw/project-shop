const { DataTypes } = require('sequelize');
import sequelize from '../index';

const record = sequelize.define('record', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    num: {
        type: DataTypes.NUMBER
    },
    costing: {
        type: DataTypes.NUMBER
    },
});
export default record;