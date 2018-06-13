
var user = require ('../Models/UserModel');
var mongoose = require('mongoose');


//register route
exports.register = function(req,res)
{
  console.log(req.body);
  req.checkBody('email', "Enter a valid email address.").isEmail();
  req.checkBody('first_name', "Enter a valid First Name.").isLength({ min: 2 });
  req.checkBody('last_name', "Enter a valid Last Name.").isLength({ min: 2});
  req.checkBody('password', " passwords must be at least 5 chars long and contain one number and").isLength({ min: 5 })
    .matches(/\d/);
  req.checkBody('password', " passwords should match with confirm password").equals(req.body.cpassword);

 var errors = req.validationErrors();
  if (errors) 
  {
    res.render('pages/register', { errors: errors });

  } 
  else 
  {
    // normal processing here
       var userData =new user(req.body);
        //encrypt password 
        userData.EncryptPasword();


        userData.save(function (err) {
          if (err) 
            { 
             console.log("error ocurred",err);
            }
          else 
            {

              console.log('Saved Successfully');
              req.flash('info', 'Welcome To Dashboard');
              return res.render('pages/login');
            }
          
        });
       
  }//else end 

}

//login route
exports.login = function(req,res)
{


  req.checkBody('email', "Enter a valid email address.").isEmail();
  req.checkBody('password', " Enter Password").notEmpty();

  var errors = req.validationErrors();
  if (errors) 
  {
    res.render('pages/login', { errors: errors });
  } 
  else 
  {
      


        user.find({ email: req.body.email }, 'first_name last_name email password', function (err, users) {
        if (err) 
          return handleError(err);
        else
        {
           var userData =new user(req.body);
        //encrypt password 
        userData.EncryptPasword();
       // console.log(userData);

        //  console.log(users);
          if(users[0].password ==userData.password)
           {
            req.session.user = users[0];
           
           // res.render('pages/dashboard',{info : users[0]});
            res.render('pages/dashboard');
            console.log(req.session);
            console.log('logged in Successfully');
            return;
           }
          else
          {  
            var errors =  [{
                        "code":200,
                        "msg":"Email and password does not match"
                          }];
             res.render('pages/login',{errors :errors });
            console.log('Incorrect Creds');
            return;
          }
        }

         })

  }//end of else

}