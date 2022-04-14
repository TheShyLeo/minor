'use strict';

const base = shared.get('base').page;
const util = require('util');

function _M(ctx){
    base.call(this,ctx);
}

util.inherits(_M,base);

_M.prototype.map = {
    "/cross/:id":{
        "get":"getByCrossId"
    },
    "/:id":{
        "get":"getById"
    }
};

_M.prototype.getById= function *(params){
    this.ctx.code=1;
    this.ctx.msg='app error';
    return params;
};

_M.prototype.getByCrossId= function *(params){
    //this.ctx.code=1;
    //this.ctx.msg='cross app error';
    return params;
};


module.exports = _M;

