'use strict';

const fs= require('fs');
const path= require('path');
const shortid = require('shortid');
const _ = require('lodash');
let tool={};

tool.mkdirsSync=function(dirname,mode){
    if(fs.existsSync(dirname)){
        return true;
    }else{
        if(tool.mkdirsSync(path.dirname(dirname),mode)){
            fs.mkdirSync(dirname,mode);
            return true;
        }
    }
};

tool.url_append_params  = function (url, params) {
    if (!params) {
        return url;
    }
    let query = url.split('?')[1];
    if (query) {
        let query_arr = query.split('&');
        let new_query_arr = [];
        _.forEach(query_arr, function (item) {
            let arr = item.split('=');
            if (arr[0] in params) {
                new_query_arr.push(item);
            }
        });
        _.forEach(params, function (value, key) {
            new_query_arr.push(key + '=' + value);
        });
        return url.split('?')[0] + '?' + new_query_arr.join('&');
    } else {
        let new_query_arr = [];
        _.forEach(params, function (value, key) {
            new_query_arr.push(key + '=' + value);
        });
        return url + '?' + new_query_arr.join('&');
    }
};

tool.genUID=function () {
    shortid.worker(process.pid%17);
    shortid.seed(process.uptime()*1000);
    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
    return shortid.generate();
};

tool.exists = async beforePath => await promises.access(beforePath).then(() => true).catch(_ => false)

module.exports=tool;
