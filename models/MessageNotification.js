'use strict'

module.exports = function (sequelize, DataTypes) {
    var messageNotifications = sequelize.define('messageNotifications', {
        id: {
            type: DataTypes.STRING(300),
            primaryKey: true,
        },
        receiver: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
        
    });

    messageNotifications.associate = (models) => {
        models.messageNotifications.belongsTo(models.candidates);
        models.messageNotifications.belongsTo(models.companies);
    }

    return messageNotifications;
};