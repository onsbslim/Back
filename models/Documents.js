'use strict'

module.exports = function (sequelize, DataTypes) {
    var Documents = sequelize.define('documents', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        document: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        
    });

    Documents.associate = (models) => {
        models.documents.belongsTo(models.companies);
    
    }
    return Documents;
};