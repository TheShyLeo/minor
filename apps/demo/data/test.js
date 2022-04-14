'use strict';

const base = shared.get('base').data;
class data extends base {
    constructor(ctx) {
        super(ctx);
    }
    dao = this.new_dao('test');
    async get() {
        return await this.dao.get();
    };
    async error() {
        this.ctx.code = 1;
        this.ctx.msg = 'error';
    };
}

module.exports = data;