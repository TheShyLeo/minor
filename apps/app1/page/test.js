'use strict';

const base = shared.get('base').page;

class page extends base {
    constructor(ctx) {
        super(ctx);
    }
    static map = {
        "/cross/:id": {
            "get": "getByCrossId"
        },
        "/:id": {
            "get": "getById"
        }
    }
    async getById(params) {
        this.ctx.code = 1;
        this.ctx.msg = 'app error';
        return params;
    };

    async getByCrossId(params) {
        //this.ctx.code=1;
        //this.ctx.msg='cross app error';
        return params;
    };

}

module.exports = page;

