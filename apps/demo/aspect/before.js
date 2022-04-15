let before = {
    async beforeGet(params) {
        this.dao = this.new_dao("test")
        let a = await this.dao.get();
        console.log(this.ctx);
        console.log("自定义之前方法执行", params);
        console.log("a:", a);
    }
}

module.exports = before;