const mongoose = require("mongoose");
const UserSchema = require('../src/moduler/user.moduler');
const OrderSchema = require('../src/moduler/order.moduler');
const ReferralSchema = require('../src/moduler/referral.moduler');




const username = process.env.MONGO_USER_NAME || "sakshia";
const password = process.env.MONGO_PASSWORD || "sakshi";
const cluster = process.env.MONGO_CLUSTER || "cluster0.jitl4kq";
const dbname = process.env.MONGO_DB_NAME || "refferaldb";

try{
    mongoose.connect(
        `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
    );
}catch(error){
    console.log("DB Connection Error", error);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

mongoose.model("User", UserSchema);
mongoose.model("Order", OrderSchema);
mongoose.model("Referral", ReferralSchema);



module.exports = db;