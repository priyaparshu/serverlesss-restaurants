'use strict';
var Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const Mustache = require('mustache');

var http = require('superagent-promise')(require('superagent'), Promise);

const restaurantsApiRoot = process.env.restaurants_api;
const days = ['Sunday', 'Monday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];


var html;

async function getrestaurants() {
    try {
        console.log('url', restaurantsApiRoot)
        const resp = (await http.get(restaurantsApiRoot)).body;
        return resp
    } catch (err) {
        console.error(err);
    }
}

async function loadhtml() {
    if (!html) {
        html = await fs.readFileAsync('static/index.html', 'utf-8');
        console.log('tmp', html)
    }
    return html;
}

module.exports.handler = async (event, context) => {
    //html = await loadhtml();
    let template = await loadhtml();
    console.log('After return', template)
    let restaurants = await getrestaurants();
    let dayOfWeek = days[new Date().getDay()]
    console.log(dayOfWeek);
    html = Mustache.render(template, { dayOfWeek, restaurants, });

    const response = {
        statusCode: 200,
        body: html,
        headers: {
            'Content-Type': 'text/html; charset=UTF-8'
        }
    }
    return response
};

