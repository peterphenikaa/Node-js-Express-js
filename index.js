const express = require('express');
require('dotenv').config();

const route = require("./routers/client/index-routes.js");

const app = express();
const port = process.env.PORT;

app.set('views', './views')
app.set('view engine', 'pug')

route(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});