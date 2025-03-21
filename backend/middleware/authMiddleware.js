const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const token = req.cookies.token;

  console.log("Getting Token: "+token);

  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};