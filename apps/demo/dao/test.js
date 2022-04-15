const base = shared.get('base').dao;
const con = shared.get('mysql');
class dao extends base {
    constructor(ctx) {
        super(ctx);
    }
    async get() {
        return await con('test').select();
    }
}

module.exports = dao;