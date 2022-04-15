'use strict';

const knex = require('knex');
const _ = require('lodash');

const map = {};

module.exports = function (app, name) {
    let cfg;
    if (!name && !app) {
        cfg = require(`${shared.get('root')}/db/global`).mysql;
    } else {
        if (map[`${app}_${name}`]) {
            return map[`${app}_${name}`];
        }
        try {
            cfg = require(`${shared.get('root')}/conf/up/db/${app}`)[name];
        } catch (e) {
            logger.error(`${shared.get('root')}/conf/up/db/${app}.js is not exist`);
            //使用默认连接
            return shared.get('mysql')
        }
    }
    cfg.fetchAsString = ['clob'].concat(_.get(cfg, 'fetchAsString', []));
    const pool = knex(cfg);

    map[`${app}_${name}`] = pool;
    return pool;
};