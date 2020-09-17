'use strict'

module.exports = function (sequelize, DataTypes) {
    var Messages = sequelize.define('messages', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        message: {
            type: DataTypes.STRING(950),
            allowNull: true,
        }
        
    });

    Messages.associate = (models) => {
        models.messages.belongsTo(models.candidates);
        models.messages.belongsTo(models.companies);
    }

    return Messages;
};