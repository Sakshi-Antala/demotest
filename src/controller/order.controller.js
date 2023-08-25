const status = require("http-status");
const orderService = require("../services/order.service");
const userService = require("../services/user.service");

class orderController {
  async createOrder(req, res) {
    try {
      const data = req.body;
      let dis_amt = 0;
      const user = await userService.getuserById(data.UserId);
      if (user) {
        dis_amt = (parseInt(data.totalAmount) * 10) / 100;
        if (dis_amt <= user.totalpoint) {
          data.disAmount = dis_amt;
          await userService.decreseUserPoint(data.UserId, dis_amt);
        } else {
          data.disAmount = 0;
        }
        if (user?.referrer_id) {
          await userService.updateUserPoint(user.referrer_id, dis_amt);
        }
      }
      data.netAmount = parseInt(data.totalAmount) - parseInt(data.disAmount);
      const response = await orderService.createOrder(req.body);
      if (response) {
        return res.status(status.OK).json({
          message: "Order Created Successfully",
          status: 200,
          data: response,
        });
      } else {
        return res
          .status(500)
          .json({ message: "Order Not Created", status: 500, data: [] });
      }
    } catch (error) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: error, status: 500 });
    }
  }

  async getOrder(req, res) {
    try {
      const data = await orderService.getOrder(req.params.id);
      if (data) {
        return res
          .status(status.OK)
          .json({ message: "Order Data Get successfully", status: 200, data });
      } else {
        return res
          .status(status.OK)
          .json({ message: "Order data Not Found", status: 200, data: [] });
      }
    } catch (error) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: error, status: 500 });
    }
  }
}

module.exports = new orderController();
