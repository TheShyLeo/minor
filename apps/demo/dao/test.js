const base = shared.get('base').dao;
class dao extends base {
    constructor(ctx) {
        super(ctx);
    }
    async get() {
        this.con = await this.getConnection();
        return await this.con('test').select();
    }
}

module.exports = dao;