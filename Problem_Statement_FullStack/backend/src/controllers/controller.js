const mongoose = require("mongoose");
const User = mongoose.model('User');
const passport = require('passport');
const bcryptjs = require("bcryptjs");
const _ = require('lodash');
const status = require("statuses");

module.exports.register = (req, res, next) => {
    // console.log('inside register fn.');
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.number = req.body.number;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
    console.log(req.body.email);
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['password', 'email']) });
        }
    );
}

module.exports.alluser = (req, res, next) => {
    User.find({}, function (err, users) {
        // var userMap = {};

        // users.forEach(function(user) {
        //     userMap[user._id] = user;
        // });
         res.send(users);
    })
    // User.find({}, 'firstName lastName picture', function (error, data) {
    //     if (error) {
    //         return res.status(500).send({
    //             msg: 'Error while finding records',
    //             data: []
    //         })
    //     } else {
    //         return res.send(200).send({
    //             msg: 'recods found',
    //             data: data
    //         })
    //     }
    // });
    }

const securePassword = async(password) => {
    try {

        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash;

    }catch(error){
        res.status(400).send(error.message);
    }
}

module.exports.updatePassword = async(req, res) => {
    try {
        
        const id = req.body.id;
        const data = await User.findOne({_id: id});
        console.log(data);

        if(data){
            // const newPassword = await securePassword(password);
            const salt = await bcryptjs.getSalt(10);
            const password = await bcryptjs.hash(req.body.password, salt);
            const userData = await User.findByIdAndUpdate({_id: id}, {password: password}, {new: true});

            res.status(200).send({status:true, message:"Your password hase been updated", data: userData});
        }else{
            res.status(400).send({status:false, message:"User Id not found"});

        }
    } catch (error) {
        res.status(400).send({status:false,error:"Error occured.."})
    }
}

// module.exports = {
//     updatePassword
// }