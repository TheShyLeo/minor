'use strict';
//数据库配置文件
const connection = {
    // host: "localhost",
    // port: 3306,
    // user: "root",
    // password: "root",
    // database: "demo",
    
    //开发
    host:"121.43.52.191",
    user:"root",
    password:"Veily2016",
    port:8306,
    database:"mts", 

    // //测试
    // host:"47.114.77.224",
    // user:"root",
    // password:"Veily@2020",
    // port:8307,
    // database:"pcbs_prod",
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
