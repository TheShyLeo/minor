'use strict';

const _ = require('lodash');
const tool = require('./tool');
const log4js=require('log4js');
const cfg = require('../../conf/global');

const logPath = _.get(cfg,'logPath',__dirname+'/../../logs');
const pattern = _.get(cfg,'logPattern','.yyyy-MM-dd.log');
const keepDays = _.get(cfg,'logKeepDays',7);
const serviceName = _.get(cfg,'serviceName',process.env.SERVICE) || 'default';
const level = _.get(cfg,'logLevel','info');

tool.mkdirsSync(logPath);

log4js.configure({
    "appenders": {
        "out": { type: 'stdout' },
        "file": {
            "type": 'dateFile',
            "filename": `${logPath}/${serviceName}`,
            "pattern":pattern,
            "numBackups":keepDays,
            "alwaysIncludePattern":true
        }
    },
    "categories": {
        'default': {
            "appenders": [ "out" ],
            "level": level
        },
        [`${serviceName}`]:{
            "appenders": [ "file" ],
            "level": level
        }
    },
    pm2: true,
    pm2InstanceVar: 'NODE_APP_INSTANCE'
});

module.exports= log4js.getLogger(serviceName);