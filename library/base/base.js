'use strict';

const _ = require('lodash');

function _load(app, type, name) {
    try {
        return require(shared.get('root') + '/apps/' + app + '/' + type + '/' + name);
    } catch (err) {
        logger.error(`base._load error , stack msg : ${err}`);
    }
}

class _M {
    constructor(ctx) {
        this.ctx = ctx;
    }

    new_object(obj, ...args) {
        try {
            return new obj(this.ctx, ...args);
        } catch (err) {
            logger.error(`base.new_object error , stack msg : ${err}`);
        }
    };

    new_page(name, app, ...args) {
        return this.new_object(_load(app || this.ctx.app, 'page', name), ...args);
    };

    new_data(name, app, ...args) {
        return this.new_object(_load(app || this.ctx.app, 'data', name), ...args);
    };

    new_dao(name, app, ...args) {
        return this.new_object(_load(app || this.ctx.app, 'dao', name), ...args);
    };

    new_api(name, cfg, app) {
        app = app || this.ctx.app;
        let API = require(shared.get('root') + '/library/base/api');
        return API(app, name, cfg, this.ctx);
    };

    get_config(name, path) {
        path = path || 'apps/' + this.ctx.app;
        name = name || 'global';
        let cfg = `${shared.get('root')}/conf/${path}/${name}`;
        let app_cfg = `${shared.get('root')}/conf/apps/${this.ctx.app}/global`;
        let g_cfg = `${shared.get('root')}/conf/global`;

        try {
            cfg = require(cfg);
        } catch (err) {
            logger.error(`${this.ctx.req_info} error: ${err}`);
            cfg = {};
        }

        try {
            app_cfg = require(app_cfg);
        } catch (err) {
            logger.error(`${this.ctx.req_info} error: ${err}`);
            app_cfg = {};
        }

        try {
            g_cfg = require(g_cfg);
        } catch (err) {
            logger.error(`${this.ctx.req_info} error: ${err}`);
            g_cfg = {};
        }
        return _.defaults(cfg, app_cfg, g_cfg);
    };


}
module.exports = _M;
