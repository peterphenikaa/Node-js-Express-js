const express = require('express');
var methodOverride = require('method-override')
require('dotenv').config();

const database = require("./config/database.js")

const systemConfig = require("./config/system")

const routeAdmin = require("./routers/admin/index-routes.js")
const route = require("./routers/client/index-routes.js")

database.connect()

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))

app.set('views', './views')
app.set('view engine', 'pug')

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.use(express.static('public'))

routeAdmin(app)
route(app)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
