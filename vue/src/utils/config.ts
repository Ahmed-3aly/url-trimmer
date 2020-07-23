
const dotenv = require('dotenv');
dotenv.config();
const r = process.env;

let API_PATH = '/api/';
let API_HOST = 'http://localhost:5000';
let ERROR_DELAY = 3000;
let TRIM_DELAY = 3000;
let MOCK_API = false;
let MOCK_DELAY = 800;
let PAGE_SIZE = 5;
let URL_PREFIX = 'https://pbid.io/';
let URL_SUFFIX = 8;

if (r.API_PATH) {
    API_PATH = r.API_PATH;
}
if (r.API_HOST) {
    API_HOST = r.API_HOST;
}
if (r.ERROR_DELAY) {
    ERROR_DELAY = Number.parseInt(r.ERROR_DELAY);
}
if (r.TRIM_DELAY) {
    TRIM_DELAY = Number.parseInt(r.TRIM_DELAY);
}
if (r.MOCK_API) {
    MOCK_API = r.MOCK_API.toLowerCase() === 'true';
}
if (r.MOCK_DELAY) {
    MOCK_DELAY = Number.parseInt(r.MOCK_DELAY);
}
if (r.PAGE_SIZE) {
    PAGE_SIZE = Number.parseInt(r.PAGE_SIZE);
}
if (r.URL_PREFIX) {
    URL_PREFIX = r.URL_PREFIX;
}
if (r.URL_SUFFIX) {
    URL_SUFFIX = Number.parseInt(r.URL_SUFFIX);
}

export const config = {
	API_PATH,
	API_HOST,
	ERROR_DELAY,
	TRIM_DELAY,
	MOCK_API,
	MOCK_DELAY,
	PAGE_SIZE,
	URL_PREFIX,
	URL_SUFFIX,
}
