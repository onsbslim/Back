'use strict'

module.exports = function (sequelize, DataTypes) {
    var Message_Notification = sequelize.define('message_notification', {
        id: {
            type: DataTypes.STRING(300),
            primaryKey: true,
        },
        receiver: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
        
    });

    Message_Notification.associate = (models) => {
        models.message_notification.belongsTo(models.candidates);
        models.message_notification.belongsTo(models.companies);
        // models.messagenotifications.belongsTo(models.candidates);
        // models.nessagenotifications.belongsTo(models.companies);
    }

    return Message_Notification;
};