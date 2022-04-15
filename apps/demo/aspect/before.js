let before = {
    async beforeGet(params) {
        this.dao = this.new_dao("test")
        let a = await this.dao.get();
        params.a = a;
        console.log("自定义之前方法执行", params);
    }
}

module.exports = before;