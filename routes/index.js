const express = require('express')
const bodyParser = require('body-parser')
const { book } = require('./models');
const { genre } = require('./models');

//console.log(genre);
//console.log(genre.findAll()); //to fetch data

const app = express()
  
app.set('view engine', 'ejs')
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
  
app.get("/", async function (req, res) {

     const booksAll = await book.findAll(); //to fetch all books from db
     //res.json(booksAll);
   //console.log(booksAll);

    res.render("home",{ ///sending to home.ejs file

        data:booksAll
    })
    //res.json(booksAll);
})
  
app.post("/", async (req, res) => {
    const inputBookName = req.body.bookName
    const inputBookAuthor = req.body.bookAuthor
    const inputBookPages = req.body.bookPages
    const inputBookPrice = req.body.bookPrice
    
    const newBook = await book.create({
        inputBookName,
        inputBookAuthor,
        inputBookPages
    });
    
    const booksAll = await book.findAll();
    res.render("home", {
        data: booksAll
    })
})
  
app.post('/issue', (req, res) => {
    var requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Issued";
        }
    })
    res.render("home", {
        data: books
    })
})
  
app.post('/return', (req, res) => {
    var requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Available";
        }
    })
    res.render("home", {
        data: books
    })
})
  
app.post('/delete', (req, res) => {
    var requestedBookName = req.body.bookName;
    var j = 0;
    books.forEach(book => {
        j = j + 1;
        if (book.bookName == requestedBookName) {
            books.splice((j - 1), 1)
        }
    })
    res.render("home", {
        data: books
    })
})
  

