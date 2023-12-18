const mongoose = require('mongoose');
const mongodb = require('mongodb');


const dbURL ="mongodb+srv://dk135781:K8pQnnGqet5x2roI@cluster20.b02vtmg.mongodb.net/?retryWrites=true&w=majority"
// const dbURL ="mongodb://127.0.0.1:27017/Medinotes";

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

