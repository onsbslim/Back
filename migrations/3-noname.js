'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "messageNotifications"
 * createTable "message_notifications", deps: [candidates, companies]
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2021-04-08T14:55:50.703Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["messageNotifications", {
                transaction: transaction
            }]
        },
        {
            fn: "createTable",
            params: [
                "message_notifications",
                {
                    "id": {
                        "type": Sequelize.STRING(300),
                        "field": "id",
                        "primaryKey": true
                    },
                    "receiver": {
                        "type": Sequelize.STRING(100),
                        "field": "receiver",
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
                    "candidateId": {
                        "type": Sequelize.INTEGER,
                        "field": "candidateId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "candidates",
                            "key": "id"
                        },
                        "allowNull": true
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
            params: ["message_notifications", {
                transaction: transaction
            }]
        },
        {
            fn: "createTable",
            params: [
                "messageNotifications",
                {
                    "id": {
                        "type": Sequelize.STRING(300),
                        "field": "id",
                        "primaryKey": true
                    },
                    "receiver": {
                        "type": Sequelize.STRING(100),
                        "field": "receiver",
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
                    "candidateId": {
                        "type": Sequelize.INTEGER,
                        "field": "candidateId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "candidates",
                            "key": "id"
                        },
                        "allowNull": true
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
