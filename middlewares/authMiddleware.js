const jwt = require("jsonwebtoken"); //is token valid i.e <1day then only response send or else dont send

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1]; //get the token from header 
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { //1st parameter = token 2nd parameter = secret key 
      if (err) {
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({ 
      message: "Auth failed", 
      success: false, 
    }); 
  }
}; 