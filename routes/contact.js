var express = require('express');
var router = express.Router();
var Contact = require('../model/contact')

/* GET users listing. */
router.get('/', function(req, res, next) {
    Contact.find(function (err,data) {
        if (err) throw err;
        res.render('getAllContact.twig',{data})
        
    } )
});

//diplay form add page
router.get('/add', function(req, res, next) {
    res.render("addContact.twig");
});
router.post('/addAction', function(req, res, next) {
    console.log(req.body);
    var contact = new Contact(
        {
        FullName : req.body.FullName,
        Phone : req.body.Phone
        }
    )
    contact.save();
    res.redirect('/contact')

});
//Delete contact
router.get('/delete/:id', function (req, res,next) {
    //lire id de l'url
    var id = req.params.id;
    Contact.findOneAndRemove({_id:id},(err)=>{
      if(err) throw err ;
    })
    res.redirect('/contact');

})
//update
router.get('/update/:id', function(req, res, next) {
    var id = req.params.id;

    Contact.findById({_id:id}, (err,data)=>{
        if(err) throw err ;
        res.render('updateContact.twig',{data})
    })
});
router.post('/update/:id',function (req,res,next) {
    var id = req.params.id;
    console.log(id)
    var data ={
        FullName : req.body.FullName,
        Phone : req.body.Phone
    }
    Contact.findByIdAndUpdate({_id:id},data,(err)=>{
        if(err) throw err ;
    })
    res.redirect("/contact")
    
})

//2 methode update
router.get('/updatee/:id', function(req, res, next) {
    var id = req.params.id;

    Contact.findById({_id:id}, (err,data)=>{
        if(err) throw err ;
        res.render('update.twig',{data})
    })
});
router.post('/updatee',function (req,res,next) {
    let id = req.body.id;

    Contact.findById({_id:id},function (err,doc){
        doc.FullName=req.body.FullName;
        doc.Phone=req.body.Phone;
        doc.save();
    });
    res.redirect("/contact/")

})




module.exports = router;
