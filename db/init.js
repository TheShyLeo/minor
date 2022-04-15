'use strict';

const config = require(shared.get('root') + '/conf/global');
const knex = require(shared.get('root') + '/library/util/knex');

async function init() {
    if (config.database_type == 'mysql') {
        let mysql = knex();
        console.log("初始化mysql成功!")
        shared.set('mysql', mysql);
    }
}

module.exports = init;