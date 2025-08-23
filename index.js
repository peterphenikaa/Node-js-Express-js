const express = require('express');
var methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require("express-flash")
require('dotenv').config();

const database = require("./config/database.js")

const systemConfig = require("./config/system")

const routeAdmin = require("./routers/admin/index-routes.js")
const route = require("./routers/client/index-routes.js")

database.connect()

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))

// parse dữ liệu từ url cho req.body controller 
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './views')
app.set('view engine', 'pug')

// flash để hiển thị thông báo trong express 
app.use(cookieParser('key random để bảo mật'))
app.use(session({ cookie: { maxAge: 60000 }}))
app.use(flash())

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.use(express.static('public'))

routeAdmin(app)
route(app)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
