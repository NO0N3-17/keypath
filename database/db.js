const mongoose = require('mongoose')

const URI = "mongodb+srv://testuser:testdatabase@noone.wc7f1.mongodb.net/DomainProject?retryWrites=true&w=majority"

const connect = async () => {
    try{
        await mongoose.connect(URI);
        console.log("Connected DB");
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connect;
