const mongoose = require("mongoose");

const uri =
  "mongodb+srv://lvhlevanhoang2001:AkXfm_Tqim76TBe@cluster0.achvn.mongodb.net/MD19304";

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = { connect };
