const Comp = require('../models/comp');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail.com',
    auth: {
      user: 'dummypac3001@gmail.com',
      pass: 'Dummypac100@'  
    }
});


exports.getCompPage = (req,res,next) => {
    res.render('comp');
};


exports.postSignUp = (req,res,next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword

    Comp.findOne({email: email})
    .then(userDoc => {
        if(userDoc) return res.redirect('/comp/SignUp');
        return bcrypt.hash(password,12)
        .then(hashedPassword => {
            const comp = new Comp({
                username: username,
                email: email,
                password: hashedPassword
            })
            return comp.save();
        })
        .then(result => {
            res.redirect('/comp/loginSignUp');
          
             
            var mailOptions = {
              from: 'dummypac3001@gmail.com',
              to: email,
              subject:'Signed Up successfully ',
              text: `Congratulations ! ${username}... Your Company account ${email} has been successfully registered with our app`
               };
           return transport.sendMail(mailOptions, (err,info) => {
           if(err) console.log(err);
           else console.log('email sent ' + info.response);
           });
             
            }).catch(err => console.log(err));

    })
    .catch(err => console.log(err));
};



exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    
   
    Comp.findOne({email: email})
    .then(user => {
      if(!user){
        req.flash('error','Invalid email or Password');
        return res.redirect('/comp/login');
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
          res.redirect('/comp/login');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/comp/login');
      });
    })
    .catch(err => console.log(err));
};
