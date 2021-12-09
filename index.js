// This is a simple express server
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000; // The server will check if the process.env has any port number, else it will proceed with 5000
const path = require("path");
const logger = require("./middleware/logger");
const exphbs = require('express-handlebars');
const members = require('./Members')


// To create route:
// app.get('/', (req, res)=>{
//     res.send('<h1>Hello World!</h1>')
// }); // The res.send() function basically sends the HTTP response.

// To send a file:
// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// }); // The res.send() function basically sends the HTTP response.


// // initializing logger from the middleware:
// app.use(logger);

// Initiating Handlebars middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//  Using in-built Body Parser from middleware in order to create a member
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) =>
res.render('index', {
    title: 'Member App',
    members
})
);

// Middle-Ware:
// Middle-ware is used instead of routing each and very pages and functions
app.use(express.static(path.join(__dirname,'public'))) // .get() is used in initializing middleware, and setting up static folder
// In this case, we set public as a static folder

// Routing the members api routes
app.use("/api/members", require("./routes/API/members"));

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
}); // Listen() must include a callback function
