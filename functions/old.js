'use strict';
var Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

var http = require('superagent-promise')(require('superagent'), Promise);

const Mustache = require('mustache');
//const restaurantsApiRoot = process.env.restaurants_api;
const days = ['Sunday', 'Monday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];
var html;

async function loadhtml() {
  console.log('entering loadhtml')
  if (!html) {
    html = await readFileAsync('static/index.html', 'utf8');
    console.log(html)
  }
  return html
}

// async function getrestaurants() {
//   try {
//     url = "https://b9z4h02swl.execute-api.us-east-1.amazonaws.com/dev/restaurants";
//     let resp = await http.get(url)
//     //console.log(JSON.stringify(resp, null, 2));
//   } catch (err) {
//     console.error(err);
//   }
// }
module.exports.handler = async (event, context) => {
  //let template = await loadhtml();
  html = await loadhtml();
  //console.log(html);
  //let restaurants = await getrestaurants();

  let dayOfWeek = days[new Date().getDay()]
  console.log(dayOfWeek);
  //html = Mustache.render(template, { dayOfWeek });

  // html = Mustache.render(template, { dayOfWeek, restaurants });
  const response = {
    statusCode: 200,
    body: html,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    }
  }
  return response
};
