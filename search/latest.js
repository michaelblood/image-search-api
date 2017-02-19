const db = require('../db');

// returns the 10 most recent searches
const getLatest = (callback) => {
  db.find({}, {_id: false, __v: false}, {sort: {time: -1}}, (err, docs) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, docs.slice(0, 10));
  });
};

module.exports = getLatest;