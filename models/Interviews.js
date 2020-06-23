'use strict'

module.exports = function (sequelize, DataTypes) {
    var Interviews = sequelize.define('interviews', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        video: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        }
        
    });

    Interviews.associate = (models) => {
        models.interviews.belongsTo(models.offers);
        models.interviews.belongsTo(models.candidates);
    }

    return Interviews;
};