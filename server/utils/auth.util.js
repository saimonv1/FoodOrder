const jwt = require("jsonwebtoken");
const AccessTokenBlackList = require("../models/AccessTokenBlackList");
const User = require("../models/User");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      username: user.username,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      username: user.username,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET
  );
};

const verifyUser = async (authorizedUsername, neededUserId) => {
  console.log(authorizedUsername);
  console.log(neededUserId);
  const authorizedUser = await User.findOne({ username: authorizedUsername });
  if (authorizedUser.id === neededUserId) {
    console.log(authorizedUser.id);
    return true;
  } else {
    return false;
  }
};

const verifyUserUsername = async (authorizedUsername, neededUsername) => {
  return authorizedUsername === neededUsername;
}

//Returns true if token is valid and not in blacklist, false if token is not valid
const verifyTokenBlacklist = async (token) => {
  const accessTokenInDB = await AccessTokenBlackList.find({accessToken: token});
  if(!accessTokenInDB) {
    return true;
  } else {
    return false;
  }
}

module.exports = { generateAccessToken, generateRefreshToken, verifyUser, verifyUserUsername, verifyTokenBlacklist };
