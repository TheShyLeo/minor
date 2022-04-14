"use strict";

const express = require('express');
const _ = require('lodash');
const glob = require('glob');
const path = require('path');

function initRoute(root, map) {
    let router = express.Router();
    _.forEach(map, function (methods, fname) {
        _.forEach(methods, function (_m, _method) {
            router[_method](fname, function (req, res) {
                let arr = /\/api\/(\w+)\/(\w+)/.exec(req.baseUrl);
                let app = arr[1];
                let action = arr[2];
                const token = req.query.token;
                let session_data = req.query.session_data ? JSON.parse(req.query.session_data) : {};
                delete req.query.session_data;
                delete req.query.token;

                let params = _.defaults(req.params, req.query, req.body);

                let ctx = {
                    app,
                    action,
                    fname,
                    method: _method,
                    params,
                    req_info: `${_method} /api/${app}/${action}${fname}`,
                    session_data,
                    req,
                    res,
                    token
                };
                let page = require(root + '/apps/' + app + '/page/' + action);
                let p = new page(ctx);
                return p.execute(_m, params);
            });
        });
    });

    return router;
}

module.exports = function (app) {
    const root = shared.get('root');
    let pages = glob.sync('apps/*/page/*.js', { cwd: root });
    _.forEach(pages, (page) => {
        const absolutePath = path.resolve(root, page);
        let Page = require(absolutePath);
        let map = Page.map;

        let arr = /apps\/(\w+)\/page\/(\w+).js/.exec(page);

        let _app = arr[1];
        let _action = arr[2];
        let base_url = '/api/' + _app + '/' + _action;
        let router = initRoute(root, map);
        app.use(base_url, router);
    });
};