
const dotenv = require('dotenv');
dotenv.config();
const r = process.env;

let LISTEN_PORT = 5000;
let DB_IN_MEMORY = false;
let DB_SEED = false;
let DB_HOST = 'localhost';
let DB_NAME = 'URL_TRIM';
let DB_PORT = 27017;
let DB_PROTOCOL = 'mongodb://';
let DB_LIST = 'records';
let API_PREFIX = '/api/';
let URL_PREFIX = 'https://pbid.io/';
let URL_SUFFIX = 8;
let SWAGGER = 'swagger';

if (r.LISTEN_PORT) {
    LISTEN_PORT = Number.parseInt(r.LISTEN_PORT);
}
if (r.DB_IN_MEMORY) {
    DB_IN_MEMORY = r.DB_IN_MEMORY.toLowerCase() === 'true';
}
if (r.DB_SEED) {
    DB_SEED = r.DB_SEED.toLowerCase() === 'true';
}
if (r.DB_NAME) {
    DB_NAME = r.DB_NAME;
}
if (r.DB_PORT) {
    DB_PORT = Number.parseInt(r.DB_PORT);
}
if (r.DB_PROTOCOL) {
    DB_PROTOCOL = r.DB_PROTOCOL;
}
if (r.DB_LIST) {
    DB_LIST = r.DB_LIST;
}
if (r.API_PREFIX) {
    API_PREFIX = r.API_PREFIX;
}
if (r.URL_PREFIX) {
    URL_PREFIX = r.URL_PREFIX;
}
if (r.URL_SUFFIX) {
    URL_SUFFIX = Number.parseInt(r.URL_SUFFIX);
}
if (r.SWAGGER) {
    SWAGGER = r.SWAGGER;
}

if (r.NODE_ENV === 'DOCKER') {
    DB_HOST = 'database';
}

const im = r.NODE_IN_MEMORY;
if (im && im.toLowerCase() === 'true') {
    DB_IN_MEMORY = true;
    DB_SEED = true;
}

export const config = {
    LISTEN_PORT,
    DB_IN_MEMORY,
    DB_SEED,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_PROTOCOL,
    DB_LIST,
    API_PREFIX,
    URL_PREFIX,
    URL_SUFFIX,
    SWAGGER,
};
