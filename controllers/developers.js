const Dev = require('../models/dev');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail.com',
    auth: {
      user: 'harsh',
      pass: ''  
    }
});


exports.getDevPage = (req,res,next) => {
    res.render('dev');
};


exports.postSignUp = (req,res,next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword

    Dev.findOne({email: email})
    .then(userDoc => {
        if(userDoc) return res.redirect('/dev/loginSignUp');
        return bcrypt.hash(password,12)
        .then(hashedPassword => {
            const dev = new Dev({
                username: username,
                email: email,
                password: hashedPassword
            })
            return dev.save();
        })
        .then(result => {
          
const mailOptions = {
  from: 'harshpachauri3001@gmail.com',
to:'harshpachauri3001@gmail.com',
subject:'successfully signed up ',
text: 'your account has been created successfully'
};

transport.sendMail(mailOptions, (err,info) => {
  if(err) console.log(err);
  else console.log('email sent ' + info.response);
});
            res.redirect('/dev/loginSignUp');
          });
    })
    .catch(err => console.log(err));
};


exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    
   
    Dev.findOne({email: email})
    .then(user => {
      if(!user){
        req.flash('error','Invalid email or Password');
        return res.redirect('/dev/login');
      }

      bcrypt.compare(password,user.password)
      .then(match => {
          if(match){
              console.log('logged in');
            // req.session.isLoggedIn = true;
            // req.session.user = user;
            // return req.session.save(err => {
            //   console.log(err);
            //   res.redirect('/');
            // })
          }
          res.redirect('/dev/login');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/dev/login');
      });
    })
    .catch(err => console.log(err));
};