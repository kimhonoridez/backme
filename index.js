/**
	@author: Kim Honoridez
*/

(function () {
	'use strict';

	var express = require('express');
	var bodyParser = require('body-parser');
	var cors = require('cors');

	var app = express();
	var port = 8080;

	var router = express.Router();

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use('/api', router);

	// START: Data Simulation APIs

	var rows = 2;
	var columns = 3;
	var dataList = [];

	router.get('/', function(req, res) {
		req.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Origin', '*');

	    res.json({
	    	r: rows,
	    	c: columns,
	    	data: dataList
	    });   
	});

	router.post('/', function(req, res) {
	    var data = req.body;

	    if (data.rno !== undefined && data.cno !== undefined && data.data !== undefined) {
	    	if (!isNaN(data.rno) && !isNaN(data.cno) && !isNaN(data.data)) {
	    		dataList[data.rno * columns + data.cno] = +data.data;

	    		res.status(200).json({
			    	r: rows,
			    	c: columns,
			    	data: dataList
			    });
	    	}
	    	else {
				res.status(500).send({
		    		errorCode: "E_002",
		    		errorMsg: "Field must be a number."
		    	});
	    	}
	    }
	    else {
	    	res.status(500).send({
	    		errorCode: "E_001",
	    		errorMsg: "Lacking required field."
	    	});
	    }
	});

	// END: Data Simulation APIs

	app.listen(port);

})();