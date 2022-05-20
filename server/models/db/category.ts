const { DataTypes } = require('sequelize');
import sequelize from '../index';

const category = sequelize.define('category', {
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    label: {
        type: DataTypes.STRING
    },
    parent: {
        type: DataTypes.NUMBER
    },
});
export default category;