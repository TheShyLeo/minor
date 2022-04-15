let before = {
    async beforeGet(params) {
        console.log(this.ctx);
        console.log("自定义之前方法执行", params);
    }
}

module.exports = before;