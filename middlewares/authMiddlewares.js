const bcrypt = require('bcrypt');
const { loginModel , questionModel ,insterestModel, interestModel, queriesModel, adminModel, responseModel } = require('../model/model');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');


// verify the web token to allow them to their site
const requireAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
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
        res.redirect('/login')
    }

}

//verify admin
const requireAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;
  if(token){
      jwt.verify(token, 'ThisisOurProject' , (err,decodedToken) => {
          if(err){
              console.log("error");
              res.redirect('/admin')
          }else{
              next();
          }
      })
  }else{
      res.redirect('/admin')
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
          const tokenAge = 24 * 60 * 60;
          res.locals.user = user;
          // req.body.email= user.email;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  }


// checking Admin
const checkAdmin = async(req, res, next) => {
  const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'ThisisOurProject', async (err, decodedToken) => {
        if (err) {
          res.locals.admin = null;
          next();
        } else {
          let user = await adminModel.findById(decodedToken.id);
          const tokenAge = 24 * 60 * 60;
          res.locals.admin = user;
          next();
        }
      });
    } else {
      res.locals.admin = null;
      next();
    }
}


const fetchQuestion = async(req, res, next) => {
  const questionList = await interestModel.find({});
  res.locals.questionList = questionList;
  next();
}

const addQuestion = async(req, res, next) => {
  const { question , field } = req.body;
  await interestModel.create({ question , field });
  next();
}

//Evaluate Answer

const evaluateAnswer = async(req, res, next) => {
    var body = req.body
    console.log(body);
    const que = await interestModel.find({}, { question:0 , _id:0 , __v:0 });
    const queType = []
    const answers = []
    var ml=0,wd=0,gd=0,ds=0
    Object.values(body).forEach(val => answers.push(val))
    Object.values(que).forEach(val => {
        queType.push(val.field);
    });
    console.log(answers);
    console.log(queType);
    for(i=0;i<answers.length;i++){
        if(queType[i] == "ml"){
            ml+=parseInt(answers[i])
        }
        else if(queType[i] == "web"){
            wd+=parseInt(answers[i])
        }
        else if(queType[i] == "gd"){
            gd+=parseInt(answers[i])
        }
        else if(queType[i] == "ds"){
            ds+=parseInt(answers[i])
        }
        else{
            ml+=parseInt(answers[i])
            wd+=parseInt(answers[i])
            gd+=parseInt(answers[i])
            ds+=parseInt(answers[i])

        }
    if(i+1 === answers.length){
      console.log("here");
      console.log(ml,wd,gd,ds);
      res.locals.ml=ml;
      res.locals.wd=wd;
      res.locals.gd=gd;
      res.locals.ds=ds;
      next();
    }
  }
}

const addQueries = async(req, res, next) => {
  const { queries , email } = req.body
  await queriesModel.create({ queries , email });

  next();
}

const fetchQueries = async(req, res, next) =>{
  const queries = await queriesModel.find({},{ _id:0 , __v:0 , response:0 })
  var query = []
  var mail = []
  Object.values(queries).forEach(val => {
    query.push(val.queries)
    mail.push(val.email)
  });
  console.log(query,mail);
  res.locals.queries = query
  res.locals.email = mail
  next();
}

const addResponse = async(req, res, next) => {
    const { query , response , email } = req.body
    await responseModel.create({ query , response , email });
    await queriesModel.deleteOne({ queries:query });
    next();

}


const fetchResponse = async(req, res, next) => {
  const responseval = await responseModel.find({},{__v:0,_id:0});
  var queries = []
  var responseArr = []
  Object.values(responseval).forEach(val => {
    queries.push(val.query)
    responseArr.push(val.response)
  });
  res.locals.queries = queries
  res.locals.response = responseArr
  next();
}


module.exports = { addingUsertodb , requireAuth , checkUser , fetchQuestion , addQuestion , evaluateAnswer ,requireAdmin, addQueries, checkAdmin, fetchQueries, addResponse ,fetchResponse}


