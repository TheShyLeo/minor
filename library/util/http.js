const _ = require('lodash');
const tool = require('./tool');
const fetch = require('node-fetch');

const _map = {};
class _httpRequest {
    constructor(option) {
        this.option = option;
    }
    async request(url) {
        let res = await fetch(url, this.option);
        let [resContentType] = res.headers.get('Content-Type');
        if (resContentType === 'application/json') {
            return await res.json();
        } else {
            return await res.text();
        }
    }
    async get(url, params) {
        let _url = url;
        if (params) {
            _url = tool.url_append_params(url, params);
        }
        return await request(_url);
    }
    async post(url, params) {
        this.option.method = 'POST';
        this.option.body = params;
        return await request(url);
    }

}
module.exports = function (app, name) {
    let key = app + '/' + name;
    let client = _map[key];
    if (client) {
        return client;
    }

    let cfg = require(`${shared.get('root')}/conf/up/http/${app}`);
    if (cfg) {
        cfg = cfg[name];
    } else {
        console.log(`${__dirname}/../../conf/up/http/${app}.js is not exist`);
    }
    let option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (cfg.method) {
        option.method = cfg.method;
    }
    if (cfg.headers) {
        option.headers = cfg.headers;
    }
    if (cfg.body) {
        option.body = cfg.body;
    }
    client = new _httpRequest(option);
    _map[key] = client;
    return client;
};
