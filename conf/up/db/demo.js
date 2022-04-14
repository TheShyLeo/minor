'use strict';

const cfg = require(shared.get('root')+'/conf/apps/demo/global');
const g_cfg = require(shared.get('root')+'/conf/global');

module.exports = {
  'base':{
    client:cfg.database_type || g_cfg.database_type,
    connection:{
      host: cfg.database_host || g_cfg.database_host,
      port: cfg.database_port || g_cfg.database_port,
      user: cfg.database_user || g_cfg.database_user,
      password: cfg.database_password || g_cfg.database_password,
      database: cfg.database || g_cfg.database,
    },
    pool: {
      min: 0,
      max: 8,
      acquireTimeoutMillis: 100000,
      idleTimeoutMillis: 100000
    },
    debug:true
  },
};
