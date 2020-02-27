const express = require("express");
const router = express.Router();
const kafka  = require('./test');

/* GET home page. */
router.get("/", function(req, res, next) {
  // get req body
  
  // check event name
  // use produce based on



  kafka.run();
  res.send("respond with a resource");
});

module.exports = router;
