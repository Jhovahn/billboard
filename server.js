const express = require('express');
const routes = require('express').Router();
const axios = require('axios');
const $ = require('cheerio');
const path = require('path');
require('dotenv').config();
let latest = 'September 21, 2018';

const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');

const app = express();
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app
  .use('/static', express.static(path.join(__dirname, '/client/build')))
  .get('*', (req, res) =>
    res.sendFile(path.join(__dirname + 'client/build/index.html'))
  );

const url = process.env.MONGO_URL;
// const url = 'mongodb://jhovahn:password1@ds247852.mlab.com:47852/notes';

routes.get('/database', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    let db = client.db('notes');

    db
      .collection('billboard')
      .find()
      .toArray((err, result) => {
        if (err) throw err;
        console.log(result);
      });
  });
});

routes.get('/albums', (req, res) => {
  axios
    .get('https://www.billboard.com/charts/hot-100')
    .then(data => {
      const html = data.data;
      let numberOneSong = $('.chart-number-one__title', html)
        .text()
        .trim();
      let numberOneArtist = $('.chart-number-one__artist', html)
        .text()
        .trim();

      let songs = $('.chart-list-item__title-text', html)
        .text()
        .split('\n')
        .filter(a => a !== '' && a !== ' ');
      let artists = $('.chart-list-item__artist', html)
        .text()
        .split('\n')
        .filter(a => a !== '' && a !== ' ');

      let date = $('.chart-detail-header__date-selector-button', html)
        .text()
        .trim();

      let result = new Array(100);

      result[0] = { position: 1, song: numberOneSong, artist: numberOneArtist };

      for (var i = 1; i < result.length; i++) {
        let postion = i + 1;
        result[i] = {
          position: postion,
          song: songs[i - 1],
          artist: artists[i - 1]
        };
      }
      res.send({ date: date, result: result });

      console.log('before', latest);

      if (date !== latest) {
        MongoClient.connect(url, (err, client) => {
          if (err) throw err;
          let db = client.db('notes');
          console.log(`post`, db.collection('billboard'));
          db.collection('billboard').insertOne({ date: date, list: result });
        });
      }

      latest = date;

      console.log('after', latest);
    })
    .catch(err => console.log(err));
});

app.listen(port, console.log(`Currently running on port ${port}`));
