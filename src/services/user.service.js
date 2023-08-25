const mongoose = require('mongoose');
const user = mongoose.model('User');
const referral = mongoose.model('Referral');

const argon2 = require('argon2');
const { populate } = require('dotenv');
class UserService {
    static async createUser(data){
        var users= new user(data);
        const hashedPassword = await argon2.hash(data.password);
        users.password=hashedPassword;
        return users.save();
    }

    static async createRefferal(data){
        var referralm= new referral(data);
        return referralm.save();
    }

    static async checkReferCode(code){
        return await referral.findOne({referralcode:code})
    }

    static async updateUserPoint(id,point){
        return await referral.findOneAndUpdate({UserId:id},{ $inc : {totalpoint : point}})
    }

    static async userLogin(data) {
        return user.findOne({ email: data.email });
    }

    static async getAllUser() {
        return user.find();
    }

    static async getuserById(id) {
        return referral.findOne({ UserId: id });
    }

    static async getuserreferralById(id) {
        return user.findOne({ _id: id });
    }

    static async decreseUserPoint(id,point){
        return await referral.findOneAndUpdate({UserId:id},{$inc : {'totalpoint' : -point}})
    }

    static async getwalletById(id) {
        return referral.findOne({ UserId: id }).populate('UserId');
    }
}

module.exports = UserService;