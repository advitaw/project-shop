const { DataTypes } = require('sequelize');
import sequelize from '../index';

const Vip = sequelize.define('vip', {
    // 在这里定义模型属性
    name: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    sex: {
        type: DataTypes.NUMBER
    },
    age: {
        type: DataTypes.NUMBER
    },
    phone: {
        type: DataTypes.STRING
    },
    score: {
        type: DataTypes.STRING
    }
});
export default Vip;