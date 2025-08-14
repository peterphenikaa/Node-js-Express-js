const express = require('express');
require('dotenv').config();

const database = require("./config/database.js")

const route = require("./routers/client/index-routes.js");

database.connect()

const app = express();
const port = process.env.PORT;

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))

route(app);



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
