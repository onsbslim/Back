'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "candidates", deps: []
 * createTable "companies", deps: []
 * createTable "documents", deps: [companies]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2020-06-22T14:52:15.288Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "candidates",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "firstname": {
                        "type": Sequelize.STRING,
                        "field": "firstname",
                        "allowNull": true
                    },
                    "lastname": {
                        "type": Sequelize.STRING,
                        "field": "lastname",
                        "allowNull": true
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "allowNull": true
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "allowNull": true
                    },
                    "about": {
                        "type": Sequelize.STRING,
                        "field": "about",
                        "allowNull": true
                    },
                    "country": {
                        "type": Sequelize.STRING,
                        "field": "country",
                        "allowNull": true
                    },
                    "industry": {
                        "type": Sequelize.STRING,
                        "field": "industry",
                        "allowNull": true
                    },
                    "birthday": {
                        "type": Sequelize.DATE,
                        "field": "birthday",
                        "allowNull": true
                    },
                    "address": {
                        "type": Sequelize.STRING,
                        "field": "address",
                        "allowNull": true
                    },
                    "phone": {
                        "type": Sequelize.STRING,
                        "field": "phone",
                        "allowNull": true
                    },
                    "Photo": {
                        "type": Sequelize.STRING,
                        "field": "Photo",
                        "allowNull": true
                    },
                    "cv": {
                        "type": Sequelize.STRING,
                        "field": "cv",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "companies",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "allowNull": true
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "allowNull": true
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": true
                    },
                    "about": {
                        "type": Sequelize.STRING,
                        "field": "about",
                        "allowNull": true
                    },
                    "sector": {
                        "type": Sequelize.STRING,
                        "field": "sector",
                        "allowNull": true
                    },
                    "phone": {
                        "type": Sequelize.STRING,
                        "field": "phone",
                        "allowNull": true
                    },
                    "website": {
                        "type": Sequelize.STRING,
                        "field": "website",
                        "allowNull": true
                    },
                    "logo": {
                        "type": Sequelize.STRING,
                        "field": "logo",
                        "allowNull": true
                    },
                    "cover": {
                        "type": Sequelize.STRING,
                        "field": "cover",
                        "allowNull": true
                    },
                    "country": {
                        "type": Sequelize.STRING,
                        "field": "country",
                        "allowNull": true
                    },
                    "state": {
                        "type": Sequelize.STRING,
                        "field": "state",
                        "allowNull": true
                    },
                    "city": {
                        "type": Sequelize.STRING,
                        "field": "city",
                        "allowNull": true
                    },
                    "street": {
                        "type": Sequelize.STRING,
                        "field": "street",
                        "allowNull": true
                    },
                    "postal_code": {
                        "type": Sequelize.INTEGER,
                        "field": "postal_code",
                        "allowNull": true
                    },
                    "longitude": {
                        "type": Sequelize.FLOAT,
                        "field": "longitude",
                        "allowNull": true
                    },
                    "latitude": {
                        "type": Sequelize.FLOAT,
                        "field": "latitude",
                        "allowNull": true
                    },
                    "verified": {
                        "type": Sequelize.BOOLEAN,
                        "field": "verified",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "documents",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "title": {
                        "type": Sequelize.STRING,
                        "field": "title",
                        "allowNull": true
                    },
                    "document": {
                        "type": Sequelize.STRING,
                        "field": "document",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "companyId": {
                        "type": Sequelize.INTEGER,
                        "field": "companyId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "companies",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["candidates", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["companies", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["documents", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
