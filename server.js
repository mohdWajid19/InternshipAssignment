const express = require("express");
const User = require("./models/userData")
const bodyParser = require("body-parser")

const app = express()
// using port from environment variable or using default port as 5000
const port = process.env.PORT || 5000

// using body-parser for translating form data into json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs')

let message = {
  userId:"",
  success:false,
  error:false
}
app.get("/", (req, res) => {
    res.render("index", {message : message})
}); 

app.post("/add", async (req, res)=> {
  // counting the no of documents which has same userId
  message.userId = req.body.userId
    const isValidUserName = await User.countDocuments({ userId: req.body.userId })
    try{
        if (isValidUserName != 0) {
          throw new Error("userId Already exists")
        }
        const userId = new User({
          userId: req.body.userId
        })
        await userId.save()
        message.success = true
        message.error = false
              
    } catch (e) {
      message.success = false
      message.error = true
        console.log(e.message)
    }
    res.render("index", {message : message})
})


app.listen(port, (err)=> {
    if(err){
        console.log(`error ${err}`);
    }
})