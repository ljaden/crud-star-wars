require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8080;
//template engine
app.set('view engine', 'ejs')
// middleware parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// server static files
app.use(express.static('public'))

//database
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://100devscrud:${process.env.SECRET_KEY}@cluster0.3fjlt.mongodb.net/star-wars-quotes`)
// database schema
const quoteSchema = new mongoose.Schema({
  name: String,
  quote: String
})
//database Model
const Quote = mongoose.model('Quote',quoteSchema);

//GET request
app.get('/', async(req,res)=> {
  const data = await Quote.find({})
  // console.log(data)
  res.render('index', {quotes: data})
});

//POST request
app.post('/quotes',(req,res)=> {

  //insert quote into database
  Quote.create(req.body)

  res.redirect('/')
})

// PUT request
app.put('/quotes', (req,res) => {
  // query from db then update
  Quote.findOneAndUpdate(
    {  // find first occurence of name='Yoda'
    name: 'Yoda'
  },
  { // replace findings with the following
    name: req.body.name,
    quote:req.body.quote
  },
  {
    upsert: true
  })
  .then(results => {
    res.json('Success')
  })
  .catch(error=> console.log(error))
})

// DELETE
app.delete('/quotes', (req,res) => {
  // remove from db
  Quote.deleteOne({
    name:req.body.name
  }).then(result => {
    if (result.deletedCount === 0) {
      return res.json('No quote to delete')
    }
    res.json(`Deleted Darth Vadar's quote`)
  })
  .catch(error => console.error(error))
})

// server listen
app.listen((process.env.PORT || PORT),()=>{
  console.log(`Server listening on PORT:${PORT}`);
})
