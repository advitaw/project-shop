const { DataTypes } = require('sequelize');
import sequelize from '../index';

const order = sequelize.define('order', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    list: {
        type: DataTypes.STRING
    },
    activity_id: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.NUMBER
    },
    type_id: {
        type: DataTypes.NUMBER
    },
    supplier_id: {
        type: DataTypes.NUMBER
    },
    vip_id: {
        type: DataTypes.NUMBER
    },
});
export default order;