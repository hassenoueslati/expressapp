var express = require('express');
var router = express.Router();
var User = require('../model/User')

const Contact = require("../model/contact");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("authentification.twig");
});

/*router.post('/auth', function (req,res,next){
      var Login = req.body.Login;
      var Password = req.body.Password;
      Contact.findById({Login:Login, Password:Password},function (err,doc){
          doc.Login=req.body.Login;
          doc.Password=req.body.Password;
          doc.save();
  });
  res.redirect("/home/")

})*/

router.post('/auth', function (req, res, next) {
  var login = req.body.Login;
  var password = req.body.Password;
  User.find(function (err, data) {
    if (err) throw err;
    console.log(data);
    data.forEach(element => {
      if (element.Login === login && element.Password === password) {
        res.redirect('/home');
      } else {
        res.redirect('/')
      }
    });
  });
});
router.post('/add', function(req, res, next) {
  console.log(req.body);
  var user = new User(
      {
        Login : "hassen",
        Password : "123456789"
      }
  )
  user.save();

});
module.exports = router;
