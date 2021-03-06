﻿var config = require('config.json');
var express = require('express');
var router = express.Router();
/*
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var path = require('path'),
    fs = require('fs');*/


var userService = require('services/user.service');
var postService = require('services/post.service');

// routes
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);

router.post('/postData',postData);
router.get('/getstatusData', getstatusData);
// router.post('/postPhoto',postPhoto);

module.exports = router;

function authenticateUser(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function registerUser(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function postData(req, res) {
    postService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getstatusData(req, res) {
	postService.getstatusData()
        .then(function (status) {
            if (status) {
                res.send(status);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/*function postPhoto(req,res) {
    console.log(req);
    console.log("in user controller");return;
}*/
/*
router.post('/postPhoto',upload.single('postPhoto'), function (req, res) {
console.log("lksdlsjdlsjdjsdj"); //return;
// req.body.image = req.file.originalname;
// console.log(req.body); return;
var tempPath = '';
var targetPath = path.resolve('./app/public/uploads/'+req.body.file);
fs.rename(tempPath, targetPath, function(err) {
    if (err) throw err;
    console.log("Upload completed!");
});
});*/