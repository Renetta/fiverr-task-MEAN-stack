const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'secret_this_should_be_longer_time');
    console.log("token verified");
    next();
  }
  catch(error) {
    res.status(401).json({
      message: "Authentication Failure!! (Reason - NO VALID TOKEN EXISTS)"
    });
  }
};
