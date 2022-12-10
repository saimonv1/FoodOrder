const jwt = require("jsonwebtoken");

const utils = require("../utils/auth.util");

const authenticateTokenAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  if (!utils.verifyTokenBlacklist(token))
    return res.status(401).json({ message: "Not authorized" });
  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Not authorized" });
    } else if (user.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

const authenticateTokenPersonal = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  if (!utils.verifyTokenBlacklist(token))
    return res.status(401).json({ message: "Not authorized" });

  await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.status(401).json({ message: "Not authorized" });
      if (!(await utils.verifyUser(user.username, req.params.userId))) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = user;
      next();
    }
  );
};

const authenticateTokenPersonalUsername = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  if (!utils.verifyTokenBlacklist(token))
    return res.status(401).json({ message: "Not authorized" });
  await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      if (
        !(await utils.verifyUserUsername(user.username, req.params.userName))
      ) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = user;
      next();
    }
  );
};

module.exports = {
  authenticateTokenAdmin,
  authenticateTokenPersonal,
  authenticateTokenPersonalUsername,
};
