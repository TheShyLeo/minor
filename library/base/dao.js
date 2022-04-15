'use strict';

const base = require('./base');
const knex = require(shared.get('root') + '/library/util/knex');
class _M extends base {
    constructor(ctx, name) {
        super(ctx);
        this.name = name || 'mysql';
    }
    async getConnection() {
        try {
            return knex(this.ctx.app, this.name);
        } catch (ex) {
            logger.error(ex);
            throw ex;
        }
    };
}

module.exports = _M;