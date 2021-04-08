'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "notifications", deps: [candidates, companies]
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2021-04-08T14:41:32.950Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
        fn: "createTable",
        params: [
            "notifications",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "title": {
                    "type": Sequelize.STRING(300),
                    "field": "title",
                    "allowNull": true
                },
                "description": {
                    "type": Sequelize.STRING(2000),
                    "field": "description",
                    "allowNull": true
                },
                "photo": {
                    "type": Sequelize.STRING(500),
                    "field": "photo"
                },
                "new": {
                    "type": Sequelize.BOOLEAN,
                    "field": "new",
                    "allowNull": true
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
    }];
};
var rollbackCommands = function(transaction) {
    return [{
        fn: "dropTable",
        params: ["notifications", {
            transaction: transaction
        }]
    }];
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
