const express = require('express');
const router = express.Router();

const User = require("../models/register");
const ctrlUser = require("../controllers/controller");
const jwtHelper = require("../config/jwtHelper");

router.get('/', (req, res) => {
    res.send("From API router")
});

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/getalluser', ctrlUser.alluser);
router.patch('/update-password', ctrlUser.updatePassword);

// (req, res) => {
    // User.find({
    //     "email": req.body.email
    // }).then(
    //     console.log(req)
    // )
// })

module.exports = router;