var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

router.get('/', (req, res) => {
    userModel.getAllApprovedJob((results) => {
        if (results.length != 0) {
            var data = {
                jb_info: results,
                u_type: req.session.u_type
            };
            res.render('job/index', data);
        } else {
            var data = {
                jb_info: null,
                u_type: req.session.u_type,
                error: "No avaiable job found."
            };
            res.render('job/index', data);
        }
    });
});

module.exports = router;