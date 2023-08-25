const status = require("http-status");
const userService = require("../services/user.service");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
var randomstring = require("randomstring");

class UserController {
  async createUser(req, res) {
    try {
      const data = req.body;
      let sdata = {};
      if (data.hasOwnProperty("referrer") && data.referrer != "") {
        const is_exists = await userService.checkReferCode(data.referrer);
        if (is_exists != null) {
          let referl_user_point = 25;
          const updated_data = await userService.updateUserPoint(
            is_exists.UserId,referl_user_point,
          );
          sdata.referralcode = data.referrer;
          sdata.totalpoint = 50;
          sdata.referrer_id=is_exists.UserId;
        } else {
          return res.json({
            message: "Invalid Referral Code",
          });
        }
      }
      const ndata = await userService.createUser(req.body);
      sdata.UserId = ndata._id;
      sdata.referralcode = randomstring.generate({
        length: 7,
        charset: 'alphabetic'
      });
      const nres = await userService.createRefferal(sdata);
      if (ndata) {
        const response = {
          message: "User Created Successfully",
          status: 200,
          data: ndata,
        };
        return res.status(status.OK).json(response);
      }
      else
      {
        return res
          .status(500)
          .json({ message: "User Not Created", status: 500, data: [] });
      }
    } catch (error) {
      const response = {
        message: "Failed to create user",
        status: 500,
        data: [],
      };
      return res.status(status.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  async userLogin(req, res) {
    try {
      const data = await userService.userLogin(req.body);
      if (!data) {
        return res
          .status(401)
          .json({ message: "Invalid Username or password" });
      }
      const isPasswordValid = await argon2.verify(
        data.password,
        req.body.password
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid Username or password" });
      } else {
        const token = jwt.sign(
          { id: data._id, email: data.email, name: data.name },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        return res.status(status.OK).json({
          message: "User login successfully",
          status: 200,
          accessToken: token,
          data,
        });
      }
    } catch (error) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: error, status: 500 });
    }
  }

  async getAllUser(req, res) {
    try {
      const data = await userService.getAllUser();
      if (data) {
        return res
          .status(status.OK)
          .json({ message: "User Get successfully", status: 200, data });
      } else {
        return res
          .status(status.OK)
          .json({ message: "User Not Found", status: 200, data: [] });
      }
    } catch (error) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: error, status: 500 });
    }
  }

  async getuserById(req, res) {
    try {
      const data = await userService.getuserById(req.params.id);
      if (data) {
        return res
          .status(status.OK)
          .json({ message: "User Get successfully", status: 200, data });
      } else {
        return res
          .status(status.OK)
          .json({ message: "User Not Found", status: 200, data: [] });
      }
    } catch (error) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: error, status: 500 });
    }
  }

  async getwalletById(req, res) {
    try {
      const data = await userService.getwalletById(req.params.id);
      if (data) {
        return res
          .status(status.OK)
          .json({ message: "User Wallet Get successfully", status: 200, data });
      } else {
        return res
          .status(status.OK)
          .json({ message: "User Wallet Not Found", status: 200, data: [] });
      }
    } catch (error) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: error, status: 500 });
    }
  }
}

module.exports = new UserController();
