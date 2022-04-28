'use strict';
//数据库配置文件
const connection = {
    // host: "localhost",
    // port: 3306,
    // user: "root",
    // password: "root",
    // database: "demo",

}

module.exports = {
    mysql: {
        client: 'mysql',
        connection: connection,
        pool: {
            min: 0,
            max: 8,
            acquireTimeoutMillis: 100000,
            idleTimeoutMillis: 100000
        },
        debug: true
    },
    connection: connection,
};
