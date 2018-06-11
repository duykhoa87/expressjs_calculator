var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();

/* GET home page. */
router.post('/log', function(req, res) {
  if(!req.body || req.body.length === 0) {
    console.log('request body not found');
    return res.sendStatus(400);
  }

  MongoClient.connect(process.env.MONGOLAB_URI, function (err, client) {
    if (err) throw err

    var db = client.db('heroku_fg867tnq')
    var document = { state: req.body.state, result: req.body.result, user_agent: req.headers['user-agent'] };
    db.collection("logs").insertOne(document, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      
      db.close();
    });
  })

  return res.send(req.body);
});

module.exports = router;
