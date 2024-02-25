// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017"
// const connectTOMongo = ()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connect to mongo succesfully")
//     })
// }
// module.exports = connectTOMongo;
const mongoose = require('mongoose');

const connectTOMongo = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/inotebook', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectTOMongo;
