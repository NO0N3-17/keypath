const bcrypt = require('bcrypt');
const { loginModel , questionModel ,insterestModel, interestModel } = require('../model/model');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');


// verify the web token to allow them to their site
const requireAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);
    if(token){
        jwt.verify(token, 'ThisisOurProject' , (err,decodedToken) => {
            if(err){
                console.log("error");
                res.redirect('/login')
            }else{
                next();
            }
        })
    }else{
        console.log("token")
        res.redirect('/login')
    }

}



// adding user to database
const addingUsertodb = async(req, res ,next) => {
    const pass = req.body.password
    const username = req.body.username
    const email = req.body.email
    const phone = req.body.phone
    const salt = await bcrypt.genSaltSync()
    const password = await bcrypt.hashSync(pass,salt)
    console.log(password);
    try{
        const user = await loginModel.create({
        username,
        email,
        password,
        phone   
    });
    }catch(err){
        console.log(err);
    }
    next();
}

//checking User
// const checkUser = (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (token) {
//       jwt.verify(token, 'ThisisOurProject', async (err, decodedToken) => {
//         if (err) {
//           next();
//         } else {
//           const user = await loginmodel.findById(decodedToken.id);
//           req.session.user = user;
//           next();
//         }
//       });
//     } else {
//       next();
//     }
//   };

//checking User
const checkUser = async(req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'ThisisOurProject', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await loginModel.findById(decodedToken.id);
          
          res.locals.user = user;
          console.log(res.locals.user);
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

const fetchQuestion = async(req, res, next) => {
  const questionList = await interestModel.find({});
  res.locals.questionList = questionList;
  console.log(questionList);
  next();
}

const addQuestion = async(req, res, next) => {
  const { question , field } = req.body;
  await interestModel.create({ question , field });
  next();
}

module.exports = { addingUsertodb , requireAuth , checkUser , fetchQuestion , addQuestion }


