//including library
const mongoose=require('mongoose');

//connect to databse
mongoose.connect('mongodb://localhost/contact_list_db')

// acquire the  connection and(to check if it is successfully or not)
const db=mongoose.connection


//error
db.on('error', console.error.bind(console, 'error connecting to db'));

//successfull
db.once('open', function(){
    console.log('Successfully connect to database');
});