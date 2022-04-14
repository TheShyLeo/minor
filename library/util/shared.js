'use strict';

const shared = {};

function get(key) {
    return shared[key];
}

function set(key, value) {
    shared[key] = value;
}

module.exports = {
    get: get,
    set: set
};
