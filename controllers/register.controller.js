var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var path = require('path'),
    fs = require('fs');
router.get('/', function (req, res) {
    res.render('register');
});

router.post('/',upload.single('image'), function (req, res) {
// console.log(req.body); return;
req.body.image = req.file.originalname;
// req.body.imagePath = req.file.path;
// console.log(req.body); return;
var tempPath = req.file.path;
var targetPath = path.resolve('./app/public/uploads/'+req.file.originalname);
// console.log(targetPath); return;
fs.rename(tempPath, targetPath, function(err) {
    if (err) throw err;
    console.log("Upload completed!");
});
    // register using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('register', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            return res.render('register', {
                error: response.body,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                phone : req.body.phone,
                image : req.file.originalname
                // imagePath : req.file.path
            });
        }

        // return to login page with success message
        req.session.success = 'Registration successful';
        return res.redirect('/login');
    });
});   

module.exports = router;