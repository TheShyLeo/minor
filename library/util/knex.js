'use strict';

const knex = require('knex');
const _ = require('lodash');

const map = {};

module.exports = function (app, name) {
    if (map[`${app}_${name}`]) {
        return map[`${app}_${name}`];
    }

    let cfg;

    try {
        cfg = require(`${shared.get('root')}/conf/up/db/${app}`)[name];
    } catch (err) {
        logger.error(`${shared.get('root')}/conf/up/db/${app}.js is not exist`);
        throw err;
    }
    cfg.fetchAsString = ['clob'].concat(_.get(cfg, 'fetchAsString', []));
    const pool = knex(cfg);

    map[`${app}_${name}`] = pool;
    return pool;
};