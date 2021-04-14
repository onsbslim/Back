'use strict'

module.exports = function (sequelize, DataTypes) {
    var Notifications = sequelize.define('notifications', {
        idNot: {
            type: DataTypes.STRING(200),
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(2000),
            allowNull: true,
        },
        photo : {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        new: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        receiver: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
        
    });

    Notifications.associate = (models) => {
        models.notifications.belongsTo(models.candidates);
        models.notifications.belongsTo(models.companies);
    }

    return Notifications;
};