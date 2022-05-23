const { DataTypes } = require('sequelize');
import sequelize from '../index';

const Goods = sequelize.define('good', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    title: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.NUMBER
    },
    supplier_id: {
        type: DataTypes.NUMBER
    },
    total: {
        type: DataTypes.NUMBER
    },
    category_id: {
        type: DataTypes.NUMBER
    },
    sales: {
        type: DataTypes.NUMBER
    },
    inPrice: {
        type: DataTypes.NUMBER
    }
});
export default Goods;