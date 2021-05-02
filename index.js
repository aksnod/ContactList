const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');

const Contact=require('./models/contact');

//express() function include all the functionalaties
const app=express();



// app.get('/',function(req,res){
//     res.send('It is running');
// });


//use middleware that is access request and responce and also can manupulate it
app.use(express.urlencoded());
app.use(express.static('assets'));

var contact_list=[
    {
        name:"Krish",
        number:'754756758'
    },
    {
        name:'Thor',
        number:'858698985'
    },
    {
        name:'Antman',
        number:'7845758748'
    }
]

// set the template engine
app.set('view engine', 'ejs');

// set the view folder and make a dynamic path
app.set('views',path.join(__dirname,'views'));




app.get('/', function(req,res){

    Contact.find({},function(err,contact){
        if(err)
        {
            console.log('contact fetching error');
            return
        }
        return res.render('home',{
            title:'My Contact List',
            contactList:contact
        
        }); //set the title and other parameter of the webpage

    }); 
});

//accept the post request and redirect to desired page
app.post('/create_contact',(req,res)=>{
    Contact.create({
        name:req.body.name,
        phone:req.body.number
    }, function(err,newContact){
        if(err){
        console.log('occuring error in cantact creating');
        return;
        }
        console.log('********', newContact);
        return res.redirect('/');
    });
    // contact_list.push(req.body);     // adding the contact
    // return res.redirect('/');
});

app.get('/delete-contact', function (req,res){
    var id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log('error at deleting time');
            return;
        }
        return res.redirect('back');

    });
    // var number=req.query.number;
    // console.log(number);
    // let deleteIndex=contact_list.findIndex(contact =>contact.number==number);
    // if(deleteIndex!= -1)
    // {
    //     contact_list.splice(deleteIndex,1);
    // }
    // return res.redirect('back');

});



app.get('/practice', (req,res)=>
{
    return res.render('practice' );
});



app.listen(port,function(err){
    if(err){
    console.log("Error on running server");
    return;
    }
    console.log('Server is running',port);

})