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

//landing homepage for recruiter
router.get('/', (req, res) => {
    userModel.get(req.session.u_id, (result) => {
        var data = { user_info: result };
        res.render('recruiter/index', data);
    });
});

//edit recruiter profile
router.get('/recruiter-edit_account', (req, res) => {
    userModel.get(req.session.u_id, (result_info) => {
        if (result_info.user_id != null) {
            var data = {
                user_info: result_info,
                errors: req.session.errors
            };
            res.render('recruiter/edit_profile', data);
        } else { res.redirect('/home-recruiter') }
    });
});

router.post('/recruiter-edit_account', (req, res) => {

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
                res.redirect('/home-recruiter');
            } else {
                res.redirect('/home-recruiter/recruiter-edit_account');
            }
        });
    } else {
        req.session.errors = err;
        res.redirect('/home-recruiter/recruiter-edit_account');
    }
});


//add a job post
router.post('/add-job', (req, res) => {
    var data = {
        u_id: req.session.u_id,
        u_name: req.session.u_name,
        c_name: req.body.c_name,
        j_title: req.body.j_title,
        j_loc: req.body.j_loc,
        j_detail: req.body.j_detail,
        a_status: 0
    };
    userModel.insertJob(data, (status) => {
        res.redirect('/home-recruiter/recruiter-job_post');
    });
});

//view own job posts
router.get('/recruiter-job_post', (req, res) => {
    userModel.getAllJobByIndividualId(req.session.u_id, function(results) {
        if (results.length != 0) {
            var data = {
                j_list: results
            }
            res.render('recruiter/job_list', data);
        } else {
            var data = {
                j_list: null,
                error: "You have 0 Job Post"
            }
            res.render('recruiter/job_list', data);
        }
    });
});

//Edit Job Post
router.post('/edit-job/:id', (req, res) => {
    var data = {
        c_name: req.body.c_name,
        j_title: req.body.j_title,
        j_loc: req.body.j_loc,
        j_detail: req.body.j_detail,
        a_status: 0,
        j_id: req.params.id
    };
    userModel.updateJobPost(data, (status) => {
        res.redirect('/home-recruiter/recruiter-job_post');
    });
});

//delete own job post
router.get('/delete-job_post/:id', (req, res) => {
    userModel.deleteJobPost(req.params.id, (status) => {
        userModel.deleteApplication(req.params.id, (st) => {
            res.redirect('/home-recruiter/recruiter-job_post');
        });
    });
});

//view applicant info based on own job post
router.get('/recruiter-view_application/:id', (req, res) => {
    userModel.getApplicantID(req.params.id, (results) => {
        userModel.getAll((u_info) => {
            var data = {
                a_list: results,
                u_list: u_info
            };
            console.log(data);
            res.render('recruiter/applicant_list', data);
        });
    });
});
module.exports = router;