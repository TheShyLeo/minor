'use strict';

const redis = require('redis');
const _map = {};


function init(cfg){
    try{
        if(_map[cfg.name||'base']){
            return _map[cfg.name||'base'];
        }
        let client = _map[cfg.name||'base'];
        if(!cfg||!cfg.port||!cfg.host)client = redis.createClient();
        else client = redis.createClient(cfg.port,cfg.host,cfg.options);
        client.on('error',function(err){
            logger.error("client error"+err);
        });
        _map[cfg.name||'base'] = client;
        return client;
    }catch(ex){
        logger.error(ex);
    }
};

function get(name,key){
    try{
        return new Promise((resolve,reject) => {
            _map[name||'base'].get(key,(err,res) => {
                if(err) console.error(err);
                resolve(res);
            })
        });
    }catch(ex){
        logger.error("get key error "+ex);
        return null;
    }
}

function set(name,key,value,expire){
    if(typeof value !== 'string') value = JSON.stringify(value);
    _map[name||'base'].set(key,value,"EX",expire||60000)
}

module.exports = {
    init:init,
    get:get,
    set:set
}