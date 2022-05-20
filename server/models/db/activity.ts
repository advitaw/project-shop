const { DataTypes } = require('sequelize');
import sequelize from '../index';

const activity = sequelize.define('activity', {
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
    creator: {
        type: DataTypes.STRING
    },
    rule_id: {
        type: DataTypes.NUMBER
    },
    startTime: {
        type: DataTypes.NUMBER
    },
    endTime: {
        type: DataTypes.NUMBER
    },
});
export default activity;