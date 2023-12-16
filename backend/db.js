const mongoose = require('mongoose');
const MONGOURI =
  'mongodb+srv://newuser:DLqWB3qqeqE6Sowx@cluster0.yzwokiv.mongodb.net/inotebook?retryWrites=true&w=majority';
const connectTo = async () => {
  try {
    await mongoose.connect(MONGOURI);
    console.log('connected successfully');
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectTo;
