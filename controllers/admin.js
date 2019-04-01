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

router.get('/', (req, res) => {
    userModel.get(req.session.u_id, (result) => {
        var data = { user_info: result };
        res.render('admin/index', data);
    });
});

//edit admin profile
router.get('/admin-edit_account', (req, res) => {
    userModel.get(req.session.u_id, (result_info) => {
        if (result_info.user_id != null) {
            var data = {
                user_info: result_info,
                errors: req.session.errors
            };
            res.render('admin/edit_profile', data);
        } else { res.redirect('/home-admin') }
    });
});

router.post('/admin-edit_account', (req, res) => {

    req.check('name', 'Empty name').notEmpty().rtrim();
    req.check('u_email', 'Invalid e-mail').isEmail();
    req.check('u_pass', 'Invalid password length').isLength({ min: 4 });
    req.check('u_birthday', 'Invalid date of birth').notEmpty().rtrim();

    var err = req.validationErrors();
    if (!err) {
        req.session.errors = null;
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
                res.redirect('/home-admin');
            } else {
                res.redirect('/home-admin/admin-edit_account');
            }
        });
    } else {
        req.session.errors = err;
        res.redirect('/home-admin/admin-edit_account');
    }
});

//show the registered userlist
router.get('/user_list', (req, res) => {

    userModel.getAll(function(results) {
        var data = {
            admin_id: req.session.u_id,
            uList: results
        };
        res.render('admin/user_list', data);
    });
});

//delete user permanently
router.get("/delete/:id", function(req, res) {

    userModel.delete(req.params.id, function(status) {
        res.redirect('/home-admin/user_list');
    });
});


//show jobs list 
router.get('/job_list', (req, res) => {
    userModel.getAllJob(function(results) {
        if (results.length != 0) {
            var data = {
                j_list: results
            }
            res.render('admin/job_list', data);
        } else {
            var data = {
                j_list: null,
                error: "No Job Post found"
            }
            res.render('admin/job_list', data);
        }
    });
});

//approve a job posts
router.post('/approve-job/:id', (req, res) => {
    var data = {
        j_id: req.params.id,
        a_status: 1
    };

    userModel.approveJobPost(data, (status) => {
        if (status) {
            res.redirect('/home-admin/job_list');
        }
    });
});


//delete a job post
router.get('/delete-job_post/:id', (req, res) => {
    userModel.deleteJobPost(req.params.id, (status) => {
        res.redirect('/home-admin/job_list');
    });
});

module.exports = router;