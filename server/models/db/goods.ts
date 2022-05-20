const { DataTypes } = require('sequelize');
import sequelize from '../index';

const Goods = sequelize.define('good', {
    // 在这里定义模型属性
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
    supplier: {
        type: DataTypes.NUMBER
    },
    total: {
        type: DataTypes.NUMBER
    },
    category: {
        type: DataTypes.NUMBER
    }
});
export default Goods;