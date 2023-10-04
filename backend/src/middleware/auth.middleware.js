const HttpException = require("../utils/HttpException.utils");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const clientAuth = () => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const bearer = "Bearer ";
      if (!authHeader) {
        throw new HttpException(401, "Access denied. No credentials sent!");
      }
      const token = authHeader.replace(bearer, "");
      //Verify Token
      const decoded = jwt.verify(token, process.env.SECRET_JWT);
      const user_data = await UserModel.isEmptyUserById(decoded.user_id);
      
      if (!user_data.state) {
        throw new HttpException(401, "Authentication failed!");
      }
      // //if the user has permissions
      req.body.currentUser = user_data.user.id;
      next();
    } catch (e) {
      e.status = 401;
      next(e);
    }
  };
};

const adminAuth = () => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const bearer = "Bearer ";
      if (!authHeader) {
        throw new HttpException(401, "Access denied. No credentials sent!");
      }
      const token = authHeader.replace(bearer, ""); 
      //Verify Token
      const decoded = jwt.verify(token, process.env.SECRET_JWT);
      const user_data = await UserModel.isEmptyUserById(decoded.user_id);
      if (!user_data.state) {
        throw new HttpException(401, "Authentication failed!");
      }
      if (user_data.user.role != 'Admin') {
        throw new HttpException(401, "Not Admin!");
      }
      // //if the user has permissions
      req.body.currentUser = user_data.user.id;
      next();
    } catch (e) {
      e.status = 401;
      next(e);
    }
  };
};

module.exports = { clientAuth, adminAuth };
