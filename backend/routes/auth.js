const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'Harrayisagoodb$oy';
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
//Route 1 : create a user using: POST "/api/auth/createuser". doesn't reuried Auth no login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password must be lengeth of 5').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // If there are errors,reture bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, error: errors.array() });
    }
    // check whether the user with this email exists alredy
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "Sorry a user with this email alredy exists" })
        }
        const salt = await bcrypt.genSalt(10);

        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);

        // res.json({user})
        success = true;
        res.json({ success,authtoken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send(" Internal server error");
    }
})
// Route 2 : Authenticate a user using: POST "/api/auth/login". doesn't reuried Auth no login required
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    let success = false;
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with corrrect Credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with corrrect Credentials" });
        }
        const data = {
            user: {
                id: user.id
            }

        }
        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({success,authtoken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send(" Internal server error");
    }

})
// Route 3 :Get loggedin user Details  using: POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser,async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send(" Internal server error");
    }
})
module.exports = router