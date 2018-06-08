var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var Burgers = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res){
	res.redirect('/burgers')
});

router.get('/burgers', function(req, res){
	Burgers.all(function(data){
		var hbsObject = {burgers: data};

		console.log(hbsObject);

		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function(req, res){
	Burgers.create(['burger_name'], [req.body.b_name], function(data){
		res.redirect('/burgers')
	});
});

// router.put("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

  router.put('/burgers/update/:id', function(req, res){
    var condition = 'id = ' + req.params.id;
  
    console.log('condition ', condition);
  
    Burgers.update({'devoured': req.body.devoured}, condition, function(data){
      res.redirect('/burgers');
    });
  });
  

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  Burgers.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
