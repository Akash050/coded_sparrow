const mongoose = require("mongoose");
const { DB_USERNAME, DB_PASS, DB_NAME } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://pcapp:pcapp@cluster0.ityvs.mongodb.net/pcapp?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (error) {
    return error;
  }
};

module.exports = connectDB;
