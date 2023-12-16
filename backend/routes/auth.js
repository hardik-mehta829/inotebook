const express = require('express');
const { body, validationResult } = require('express-validator'); //using express validator to validate body of the request.
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
//createuser end point to create a new user.
const JWT_SECRET_KEY = 'Iamab$oy';
const fetchUser = require('../middleware/fetchuser');
router.post(
  '/createuser',
  body('email').isEmail(),
  body('name').isLength({ min: 3 }),
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      //If there are errors return bad requests and error
      return res.status(400).json({ result: result.array() });
    } else {
      try {
        let success = false;
        const salt = await bcrypt.genSalt(10); //salt to prevent rainbow table attack.
        const hash = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        //to save the document in the database.
        await user.save();
        const jwtData = {
          user: {
            id: user.id, // id is used because it is indexed in database so it makes retrieval easier.
          },
        };

        const token = jwt.sign(jwtData, JWT_SECRET_KEY);
        console.log(token);
        success = true;
        res.json({ token, success });
      } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
      }
    }
  }
);
//login the user
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    let success = false;
    if (!user) {
      return res
        .status(400)
        .json({ error: 'Please enter valid credentials', success });
    }
    const checker = await bcrypt.compare(password, user.password);
    if (!checker)
      return res
        .status(400)
        .json({ error: 'Please enter valid credentials', success });
    const jwtData = {
      user: {
        id: user.id, // id is used because it is indexed in database so it makes retrieval easier.
      },
    };
    console.log(jwtData);
    const token = jwt.sign(jwtData, JWT_SECRET_KEY);
    success = true;
    res.json({ token, success });
  }
);
//Route to authenticate a user.
router.post('/getuser', fetchUser, async (req, res) => {
  try {
    const id = req.user;
    console.log(id);
    const user = await User.findById(id).select('-password');
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: 'Please enter valid credentials' });
  }
});
module.exports = router;
