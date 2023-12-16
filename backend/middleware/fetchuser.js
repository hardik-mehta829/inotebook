const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'Iamab$oy';
const fetchuser = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token)
      return res.status(400).send('Please authenticate with valid token');
    // console.log(req.headers);
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded.user.id;

    next();
  } catch (error) {
    return res.status(401).send('Please authenticate using valid token');
  }
};
module.exports = fetchuser;
