'use strict';

const base = require('./base');
class _M extends base {
    constructor(_ctx, ctx) {
        this.parent_ctx = ctx;
        super(_ctx);
    }
    async route() {
        const action = this.ctx.action;
        const fname = this.ctx.fname;
        const method = this.ctx.method;
        const params = this.ctx.params;

        let p = this.new_page(action);
        let ok = await p._before(params);
        let result = {};
        if (ok) {
            let m = p.map[fname][method];
            result = await p[m](params);
        }
        result = await p._after(result);
        if (this.ctx.code) {
            this.parent_ctx.code = this.ctx.code;
            this.parent_ctx.msg = this.ctx.msg;
        }
        return result;
    };
}

module.exports = _M;