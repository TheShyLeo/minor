'use strict';

const _ = require('lodash');
const Router = require('./inner_router');

class _M {
    constructor(app, name, cfg, ctx) {
        const config = require(shared.get('root') + '/conf/up/api/' + app);
        cfg = _.get(config, name, cfg);
        const _app = cfg.app;
        const _action = cfg.action;

        let _ctx = {
            "from": app,
            "app": _app,
            "action": _action,
            "req_info": `/api/${_app}/${_action}`,
            "session_data": ctx.session_data,
            "token": ctx.token,
            "req": ctx.req,
            "res": ctx.res
        };
        this.router = new Router(_ctx, ctx);
    }
    async invoke(fname, params, method) {
        this.router.ctx.fname = fname;
        this.router.ctx.params = params;
        this.router.ctx.method = method || 'get';
        this.router.ctx.req_info = `${this.router.ctx.method} ${this.router.ctx.req_info}${fname}`;
        return await this.router.route();
    };
}

module.exports = _M;


