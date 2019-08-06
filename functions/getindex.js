'use strict';
var Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

var http = require('superagent-promise')(require('superagent'), Promise);

//const Mustache = require('mustache');
const restaurantsApiRoot = process.env.restaurants_api;
const days = ['Sunday', 'Monday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];


var html

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
        return await fs.readFileAsync('static/index.html', 'utf-8');
    }
}

module.exports.handler = async (event, context) => {
    html = await loadhtml();
    let restaurants = await getrestaurants();
    console.log("rest", restaurants);

    let dayOfWeek = days[new Date().getDay()]
    console.log(dayOfWeek);
    //html = Mustache.render(template, { dayOfWeek });

    const response = {
        statusCode: 200,
        body: html,
        headers: {
            'Content-Type': 'text/html; charset=UTF-8'
        }
    }
    return response
};

