const express = require('express')

const { book } = require('./models');
const { genre } = require('./models');

const bodyParser = require('body-parser');
// const book = require('./models/book');

const hostname = '127.0.0.1';
const port = 3000;

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs');
app.use(express.static('public'))

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
 const inputBookState= req.body.bookState
 const inputBookGenre= req.body.bookGenre
 console.log (req.body)
 const newBook = await book.create({
     name:inputBookName,
     author:inputBookAuthor,
     pages:inputBookPages,
     price:inputBookPrice,
     state:inputBookState,
     genre_id:inputBookGenre
 });
 
 const booksAll = await book.findAll();
 res.render("home", {
     data: booksAll
 })
})

app.post('/issue', async (req, res) => {
 var requestedBookName = req.body.bookName;
 await book.update({state:"Issued"},{where:{name:requestedBookName}})
//  book.forEach(book => {
//      if (book.bookName == requestedBookName) {
//         return book.bookState = "Issued";
//      }
//  })
let allbooks = await book.findAll()
console.log(requestedBookName)
 res.render("home",{data:allbooks}
 )
})

app.post('/return', async (req, res) => {
 var requestedBookName = req.body.bookName;
 console.log (req.body)
 let allbooks = await book.findAll()
 allbooks.forEach(book => {
     if (book.name == requestedBookName) {
      console.log("test")
    book.update({
      name: book.name,
      author: book.author,
      pages: book.pages,
      price: book.price,
      genre_id: book.genre_id,
      state:"Available"
    })
     }
 })
 res.render("home", {
     data: allbooks
 })
})

app.post('/delete', async (req, res) => {
 var requestedBookName = req.body.bookName;
 let allbooks = await book.findAll()

 allbooks.forEach(book => {
     if (book.name == requestedBookName) {
      console.log("test")
    book.destroy({
    where:{name:requestedBookName}
    })
     }
    })
 res.render("home", {
     data: allbooks
 })
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

