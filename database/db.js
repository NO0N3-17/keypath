const mongoose = require('mongoose')

const URI = ""

const connect = async () => {
    try{
        await mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected DB");
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connect;