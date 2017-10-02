/**
	@author: Kim Honoridez
*/

(function () {
	'use strict';

	var express = require('express');
	var bodyParser = require('body-parser');
	var https = require('https');
	var fs = require('fs');

	var app = express();
	var port = 3000;

	var router = express.Router();
	
	var cors = require('cors');
	app.use(cors());

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use('/api', router);

	// START: Data Simulation APIs

	var rows = 2;
	var columns = 3;
	var dataList = [];

	router.get('/', function(req, res) {
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

	    		res.status(200).send({
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

	//app.listen(port);

	https.createServer({
      key: fs.readFileSync('./kissaaviota.key'),
      cert: fs.readFileSync('./kissaaviota.cert')
    }, app).listen(port);
})();