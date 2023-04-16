const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json("authorization header not found");
  const authHeader = req.headers.authorization;
  const token = authHeader.split("Bearer ")[1];
  if (!token) return res.status(401).json("token not found");
  try {
     jwt.verify(token, process.env.SECRET_KEY,(err,user)=>{
        if (err) return res.status(401).json("token not valid");   
        req.user = user;
        next();
    });
  } catch (err) {
    res.status(501).send(err);
  }
};

module.exports = { verifyToken };
