var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

//ROUTES
router.get('/', (req, res) => {
    var err = {
        errors: req.session.errors,
        success: req.session.success
    };
    req.session.errors = null;
    req.session.success = null;
    res.render('signup/index', err);
});


router.post('/', function(req, res) {

    req.check('f_name', 'Empty FirstName').trim().notEmpty();
    req.check('l_name', 'Empty LastName').notEmpty().trim();
    req.check('u_email', 'Invalid e-mail address').isEmail();
    req.check('u_pass', 'Missmatched password or length less than 4').isLength({ min: 4 }).equals(req.body.confirm_pass);
    req.check('u_birthday', 'Invalid date of birth').notEmpty().trim();

    var err = req.validationErrors();

    if (!err) {
        var user = {
            name: req.body.f_name + " " + req.body.l_name,
            u_email: req.body.u_email,
            user_type: req.body.user_type,
            relationship_status: req.body.relationship_status,
            u_pass: req.body.u_pass,
            u_location: req.body.u_location,
            u_gender: req.body.u_gender,
            u_birthday: req.body.u_birthday
        };
        req.session.errors = null;
        userModel.checkExistingEmail(req.body.u_email, (result) => {
            if (result.length == 0) {
                userModel.insert(user, function(results) {
                    req.session.success = 'Successfully sign up...Good to go!!';
                    res.redirect('/signup');

                });
            } else {
                req.session.success = 'Probelm with signup..Check out the database connection Or The email is already taken'
                res.redirect('/signup');
            }
        });
    } else {
        req.session.errors = err;
        res.redirect('/signup');
    }
});

module.exports = router;