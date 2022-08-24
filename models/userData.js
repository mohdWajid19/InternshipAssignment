const mongoose = require('mongoose');
const url = "mongodb://localhost/user_details";
 
// Connecting to database
mongoose.connect(url, {useNewUrlParser: true});
mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
})

// creting new schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("User",userSchema)
