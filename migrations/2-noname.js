'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "offers", deps: [companies]
 * addColumn "degree" to table "candidates"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2020-06-22T15:09:19.341Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "offers",
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
                    "accepted_degree": {
                        "type": Sequelize.STRING,
                        "field": "accepted_degree",
                        "allowNull": true
                    },
                    "experience_years": {
                        "type": Sequelize.INTEGER,
                        "field": "experience_years",
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
        },
        {
            fn: "addColumn",
            params: [
                "candidates",
                "degree",
                {
                    "type": Sequelize.STRING,
                    "field": "degree",
                    "allowNull": true
                },
                {
                    transaction: transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "removeColumn",
            params: [
                "candidates",
                "degree",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "dropTable",
            params: ["offers", {
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
