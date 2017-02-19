const express = require('express');
const path = require('path');

const search = require('./search/search');
const latest = require('./search/latest');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/search/latest', (req, res) => {
  let pretty = req.query.pretty;
  latest((err, items) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!pretty) res.json(items);
    else {
      res.end(JSON.stringify(items, null, 2));
    }
  });
});

// q is a required parameter, offset is optional
app.get('/api/search', (req, res) => {
  let q = req.query.q;
  let offset = req.query.offset || 0;

  search({q, offset}, (err, items) => {
    if (err) {
      res.json(err.toString());
      return;
    }
    res.json(items);
  });
});

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});