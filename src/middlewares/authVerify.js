const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.authMiddleware = async (req, res, next) => {
  try {
    
    console.log("eiei")
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(token, process.env.Secret_Key, async (err, authData) => {
      if (err) {
        console.log("error")
        res.sendStatus(403);
      } else {
        const user_info = authData.auth;
        req.userId = user_info._id;
        req.username = user_info.username;
        console.log("testttttttttttt")
        console.log(req.userId,req.username)
      }
    });
    return next();
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};
