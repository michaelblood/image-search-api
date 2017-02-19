const qs = require('query-string');
const request = require('request');
const fs = require('fs');
const db = require('../db');

// key, custom engine, and api endpoint for the google CSE api
const key = process.env.API_KEY || (process.env.API_KEY = JSON.parse(fs.readFileSync('./config.json')).API_KEY, process.env.API_KEY);
const cx = '008961251027730587007:pailjgxn2kg';
const baseurl = 'https://www.googleapis.com/customsearch/v1?'

// log the search term to mongoDB, to provide recent searches
const log = (term) => {
  db.create({ term }, (err, doc) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(term, 'added successfully');
  });
};

// parse the item returned from the google search to get only the info we need.
const getThumb = (item) => {
  try {
    let thumb = item.pagemap.cse_thumbnail[0].src;
    return thumb;
  } catch(e) {
    return null;
  }
};
const getImgUrl = (item) => {
  try {
    let img = item.pagemap.cse_image[0].src;
    return img;
  } catch(e) {
    return null;
  }
};
const getPageUrl = (item) => {
  return item.link || null;
};
const getSnippet = (item) => {
  return item.snippet || null;
};
// parse the items from the search, and return a new array
const parseItems = (items) => {
  let newItems = [];
  for (let i = 0; i < items.length; i++){
    let item = {
      imgUrl: getImgUrl(items[i]),
      pageUrl: getPageUrl(items[i]),
      snippet: getSnippet(items[i]),
      thumb: getThumb(items[i])
    };
    newItems.push(item);
  }
  return newItems;
};

// search function: {string: q, number: offset}, callback(error, items)
// logs the query to mongoDB with the current time
const search = ({
  q = '',
  offset = 0
}, callback) => {
  if (q.length < 1) {
    callback(new Error('missing required parameter: q'));
    return;
  }
  log(q);
  const url = baseurl + qs.stringify({q, key, cx, start: offset});
  request(url, (err, res, body) => {
    if (err) {
      callback(err);
      return;
    }
    let parsedBody = JSON.parse(body);
    if (parsedBody.error) {
      callback(new Error('API limit reached'));
      return;
    }
    let items = parseItems(parsedBody.items);
    callback(null, items);
  });
};

module.exports = search;