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

const queriesSchema = new schema({
    queries:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
});

const responseSchema = new schema({
    query:{
        type: String,
        required: true
    },
    response:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
    
});
// Static function

// User login 
loginSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compareSync(password,user.password);
        if(auth){
            return user
        }
    }
}

//Admin login
adminSchema.statics.login = async function(email, password){
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

const queriesModel = mongoose.model("queries",queriesSchema);

const responseModel = mongoose.model("responses",responseSchema);

//Module Exports

module.exports = { loginModel , questionModel , adminModel , interestModel , queriesModel, responseModel};