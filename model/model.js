const mongoose = require('mongoose')
const schema = mongoose.Schema;
const bcrypt = require('bcrypt')

//Login Schema
const loginSchema = new schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: [true, "Email already in use"],
        lowercase: true,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true

    }
});

// Question Schema
const questionSchema = new schema({
    question:{
        type: String,
        required: true
    },
    options:{
        type: String,
        reuqire: true
    },
    answer: String
});

//Interest Schema

const intersetSchema = new schema({
    question: {
        type: String,
        required: true
    },
    field:{
        type: String,
        required: true
    }

})

//Admin Schema
const adminSchema = new schema({
    username: String,
    password: String
});

// Static function

loginSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compareSync(password,user.password);
        if(auth){
            return user
        }
    }
}


//Models

const loginModel = mongoose.model("logins",loginSchema);

const questionModel = mongoose.model("questions",questionSchema);

const adminModel = mongoose.model("admins",adminSchema);

const interestModel = mongoose.model("interests",intersetSchema);

//Module Exports

module.exports = { loginModel , questionModel , adminModel , interestModel };