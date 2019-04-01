var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

//ROUTES
router.get('*', function(req, res, next) {
    if (req.session.u_id != null) {
        next();
    } else {
        res.redirect('/login');
    }
});

//landing homepage for applicant
router.get('/', (req, res) => {
    userModel.get(req.session.u_id, (result) => {
        var data = { user_info: result };
        res.render('applicant/index', data);
    });
});


//edit applicant profile
router.get('/applicant-edit_account', (req, res) => {
    userModel.get(req.session.u_id, (result_info) => {
        if (result_info.user_id != null) {
            var data = {
                user_info: result_info,
                errors: req.session.errors
            };
            res.render('applicant/edit_profile', data);
        } else { res.redirect('/home-applicant') }
    });
});

router.post('/applicant-edit_account', (req, res) => {

    req.check('name', 'Empty name').notEmpty().rtrim();
    req.check('u_email', 'Invalid e-mail').isEmail();
    req.check('u_pass', 'Invalid password length').isLength({ min: 4 });
    req.check('u_birthday', 'Invalid date of birth').notEmpty().rtrim();

    var err = req.validationErrors();
    if (!err) {
        req.session.errors = null;
        req.session.u_loc = req.body.u_location;
        var update_user = {
            name: req.body.name,
            u_email: req.body.u_email,
            user_type: req.body.user_type,
            relationship_status: req.body.relationship_status,
            u_pass: req.body.u_pass,
            u_location: req.body.u_location,
            u_gender: req.body.u_gender,
            u_birthday: req.body.u_birthday,
            user_id: req.session.u_id
        };
        //update user_info table information
        userModel.update(update_user, (user_update_status) => {
            if (user_update_status) {
                res.redirect('/home-applicant');
            } else {
                res.redirect('/home-applicant/applicant-edit_account');
            }
        });
    } else {
        req.session.errors = err;
        res.redirect('/home-applicant/applicant-edit_account');
    }
});

//Apply to a job post
router.post('/apply-job/:id', (req, res) => {

    var data = {
        j_id: req.params.id,
        u_id: req.session.u_id
    };
    userModel.checkApplication(data, (result) => {

        if (result.length != 0) {
            res.redirect('/home-applicant');
        } else {
            var data = {
                j_id: req.params.id,
                u_id: req.session.u_id
            };
            userModel.insertApplication(data, (status) => {
                if (status) {
                    res.redirect('/home-applicant');
                } else {
                    res.redirect('/job');
                }
            });
        }

    });
});
module.exports = router;