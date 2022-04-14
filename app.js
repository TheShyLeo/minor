'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const qs = require('qs');
const app = express();

/*
 * 这种模式配置无效,express的bug,见https://github.com/expressjs/express/issues/3454
 * app.use(bodyParser.urlencoded({ extended: true }));
*/

app.set('query parser', function(str) {
    return qs.parse(str, { arrayLimit: Infinity });
});

app.use(logger('dev'));
app.use(bodyParser.json({"limit":"10240kb"}));
app.use(express.static(path.join(__dirname, 'public')));

require('./library/init')(app,__dirname);
require('./routes/init')(app);

process.on('SIGINT', () => {
    let child_pid = shared.get('child_pid');
    for(let i in child_pid){
        try {
            process.kill(child_pid[i]);
        } catch (error) {
            global.logger.error(error);
            process.exit(1);
        }
    }
    setTimeout(()=>{process.exit(0)},1000);
});

module.exports = app;



