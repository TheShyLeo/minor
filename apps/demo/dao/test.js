const con = shared.get('mysql');
class dao {
    async get() {
        return await con('test').select();
    }
}

module.exports = dao;