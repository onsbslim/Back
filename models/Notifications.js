'use strict'

module.exports = function (sequelize, DataTypes) {
    var Notifications = sequelize.define('notifications', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            type: DataTypes.STRING(500)
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
        models.Notifications.belongsTo(models.candidates);
        models.Notifications.belongsTo(models.companies);
    }

    return Messages;
};