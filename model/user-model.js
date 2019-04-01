var db = require('./db');


module.exports = {
    get: function(userId, callback) {
        var sql = "SELECT * from users_info where user_id=?";
        db.getResults(sql, [userId], function(result) {
            if (result.length > 0) {
                callback(result[0]);
            } else {
                callback([]);
            }
        });
    },

    getAll: function(callback) {
        var sql = "SELECT * from users_info";
        db.getResults(sql, [], function(results) {
            callback(results);
        });
    },

    validate: function(user, callback) {
        var sql = "SELECT * from users_info where user_email=? and user_password =?";
        db.getResults(sql, [user.u_email, user.u_pass], function(result) {
            if (result.length > 0) {
                callback(result[0]);
            } else {
                callback([]);
            }
        })
    },

    insert: function(user, callback) {
        var sql = "INSERT into users_info values(null,?,?,?,?,?,?,?,?)";
        db.execute(sql, [user.name,
            user.u_email,
            user.user_type,
            user.relationship_status,
            user.u_pass, user.u_location,
            user.u_gender,
            user.u_birthday
        ], function(success) {
            callback(success);
        });
    },

    update: function(user, callback) {
        var sql = "UPDATE users_info SET user_name=?,user_email=?,user_relationship_status=?,user_password=?,user_location=?,user_gender=?,user_dob=? where user_id=?";
        db.execute(sql, [
            user.name,
            user.u_email,
            user.relationship_status,
            user.u_pass,
            user.u_location,
            user.u_gender,
            user.u_birthday,
            user.user_id
        ], function(status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },

    delete: function(id, callback) {
        var sql = "DELETE from users_info where user_id=?";
        db.execute(sql, [id], function(status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },

    getAllJob: function(callback) {
        var sql = "SELECT * from job";
        db.getResults(sql, [], function(results) {
            callback(results);
        });
    },

    getAllJobByIndividualId: function(id, callback) {
        var sql = "SELECT * from job where u_id=?";
        db.getResults(sql, [id], function(results) {
            callback(results);
        });
    },

    getAllApprovedJob: function(callback) {
        var sql = "SELECT * from job where a_status = 1";
        db.getResults(sql, [], function(results) {
            callback(results);
        });
    },

    insertJob: function(data, callback) {
        var sql = "INSERT into job values(null,?,?,?,?,?,?,?)";
        db.execute(sql, [
            data.u_id,
            data.u_name,
            data.c_name,
            data.j_title,
            data.j_loc,
            data.j_detail,
            data.a_status
        ], function(status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    approveJobPost: function(data, callback) {
        var sql = "UPDATE job SET a_status=? where j_id=?";

        db.execute(sql, [data.a_status, data.j_id], function(status) {
            callback(status);
        });
    },

    deleteJobPost: function(id, callback) {
        var sql = "DELETE from job where j_id=?";
        db.execute(sql, [id], function(status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    deleteApplication: function(id, callback) {
        var sql = "DELETE from applied_jobs where j_id=?";
        db.execute(sql, [id], function(status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },

    updateJobPost: function(data, callback) {
        var sql = "UPDATE job SET c_name=?, j_title=?, j_location=?, j_detail=?, a_status=? where j_id=?";

        db.execute(sql, [
            data.c_name,
            data.j_title,
            data.j_loc,
            data.j_detail,
            data.a_status,
            data.j_id
        ], function(status) {
            callback(status);
        });
    },

    insertApplication: function(data, callback) {
        var sql = "INSERT into applied_jobs values(null,?,?)";
        db.execute(sql, [
            data.j_id,
            data.u_id,
        ], function(status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },

    getAllApplication: function(callback) {
        var sql = "SELECT * from applied_jobs";
        db.getResults(sql, [], function(results) {
            callback(results);
        });
    },
    checkApplication: function(data, callback) {
        var sql = "SELECT * from applied_jobs where j_id=? and u_id=?";
        db.getResults(sql, [data.j_id, data.u_id], function(results) {
            callback(results);
        });
    },
    getApplicantID: function(id, callback) {
        var sql = "SELECT * from applied_jobs where j_id=?";
        db.getResults(sql, [id], function(result) {
            callback(result);
        });
    },

    checkExistingEmail: function(email, callback) {
        var sql = "SELECT * from users_info where user_email=?";
        db.getResults(sql, [email], function(result) {
            callback(result);
        });
    },
};