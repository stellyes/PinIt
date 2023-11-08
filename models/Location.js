const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model { }

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        lat: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        lon: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        location_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        category_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'category',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'location',
    }
);