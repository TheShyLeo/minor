'use strict';

const base = shared.get('base').page;

class page extends base {
    constructor(ctx) {
        super(ctx);
    }
    data = this.new_data('test');
    static map = {
        "/": {
            "get": "get"
        },
        "/app": {
            "get": "testApp"
        },
        "/app/cross": {
            "get": "testCrossApp"
        },
        "/:id": {
            "get": "getById",
            "put": "updateById"
        },
        "/error": {
            "get": "error"
        }
    }
    // aspect = {
    //     "get":{
    //         "before":"beforeGet",
    //         "after":"afterGet"
    //     }
    // }

    async get() {
        console.log("业务执行!!!!")
        return await this.data.get();
    };

    async getById(params) {
        return params;
    };

    async updateById(params) {
        return params;
    }

    async testApp() {
        let testApi = this.new_api('test');
        return await testApi.invoke("/:id", { "id": "app" });
    };

    async testCrossApp() {
        let testApi = this.new_api('testCross');
        return await testApi.invoke("/cross/:id", { "id": "cross" });
    };

    async error() {
        return await this.data.error();
    };
}

module.exports = page;