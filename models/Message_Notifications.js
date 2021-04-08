'use strict'

module.exports = function (sequelize, DataTypes) {
    var Message_Notifications = sequelize.define('message_notifications', {
        id: {
            type: DataTypes.STRING(300),
            primaryKey: true,
        }
        
    });

    Message_Notifications.associate = (models) => {
        models.message_notifications.belongsTo(models.candidates);
        models.message_notifications.belongsTo(models.companies);
    }

    return Message_Notifications;
};