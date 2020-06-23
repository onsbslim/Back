'use strict'

module.exports = function (sequelize, DataTypes) {
    var Photos = sequelize.define('photos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
    });


    Photos.associate = (models) => {
        models.photos.belongsTo(models.companies);    
    }


   
    return Photos;
};