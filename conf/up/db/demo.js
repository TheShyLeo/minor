'use strict';

const db_cfg = require(shared.get('root') + '/db/global');

//也可以自定义数据库连接配置
module.exports = db_cfg.mysql;
