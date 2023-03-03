const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/User",{
    useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() =>{
    console.log(`Connection Successfully...` );
}).catch((e) => {
    console.log(`No Connection`);
})