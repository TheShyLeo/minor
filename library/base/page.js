'use strict';

const base = require('./base');
const _ = require('lodash');
const { promises } = require('fs');

//实现切面
Function.prototype.before = function (beforefn, self) {
    let _this = this; //  记录原函数的引用
    return  async  function () {
        await beforefn.apply(self, arguments);
        return _this.apply(self, arguments);
    }
}

Function.prototype.after = function (afterfn, self) {
    let _this = this;
    return async  function () {
        let res = await _this.apply(self, arguments);
        await afterfn.apply(self, arguments);
        return res;
    }
}

const exists = async beforePath => await promises.access(beforePath).then(() => true).catch(_ => false)

class _M extends base {
    async execute(_m, params) {
        let result = {};
        let beforeMap = {};
        let afterMap = {};
        let ok = await this._before(params);
        if (ok) {
            if (!_.isFunction(this[_m])) {
                this.ctx.res.status(404).end();
                return;
            }
            let app = this.ctx.app;
            //获取切面配置
            let aspect = this.aspect;
            let beforePath = shared.get('root') + `/apps/${app}/aspect/before.js`;
            let afterPath = shared.get('root') + `/apps/${app}/aspect/after.js`;
            //获取切面函数对象
            const exist1 = await exists(beforePath)
            const exist2 = await exists(afterPath)
            if (exist1) beforeMap = require(beforePath)
            if (exist2) afterMap = require(afterPath)
            try {
                if (aspect && aspect[_m]) {
                    let f1 = beforeMap[aspect[_m].before] ? beforeMap[aspect[_m].before] : new Function();
                    let f2 = afterMap[aspect[_m].after] ? afterMap[aspect[_m].after] : new Function();
                    result = await this[_m].before(f1, this).after(f2, this)(params);
                } else {
                    result = await this[_m](params);
                }
            } catch (ex) {
                logger.error(ex);
                this.ctx.code = 1;
                let cfg = this.get_config('global', '.');
                if (cfg.env === 'dev') {
                    this.ctx.msg = ex.message;
                } else {
                    this.ctx.msg = 'params error';
                }
            }
        }
        result = await this._after(result);
        return this._send(result);
    };
    async _before(params) {
        this.time = process.uptime();
        logger.debug(`${this.ctx.req_info} request: ${JSON.stringify(params)}`);
        return true;
    };
    async _after(result) {
        this.cost = ((process.uptime() - this.time) * 1000).toFixed(2);
        logger.debug(`${this.ctx.req_info} response: ${JSON.stringify(result)} cost: ${this.cost}`);
        return result;
    };
    _send(result) {
        if (this.ctx.res.get && this.ctx.res.get("Content-Type")) {
            return;
        }
        if (this.ctx.code) {
            return this._send_error();
        }
        if (this.ctx.raw) {
            return this.ctx.res.json(result);
        } else {
            let resp = {
                code: 0,
                data: result,
                cost: this.cost
            };
            if (_.isPlainObject(result) && result.data) {
                resp = _.defaults(result, resp);
            }

            return this.ctx.res.json(resp);
        }
    };
    _send_error() {
        return this.ctx.res.json({
            code: this.ctx.code,
            msg: this.ctx.msg,
            cost: this.cost
        });
    };
}

module.exports = _M;