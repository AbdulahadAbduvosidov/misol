const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

//router
const CarsRouter = require('./router/cars.router');
const FruitsRouter = require('./router/fruits.router');
const AnimalsRouter = require('./router/animals.router');
const UsersRouter = require('./router/users.router');
const SignUpRouter = require('./router/sign_up.router');
const SignInRouter = require('./router/sign_in.router');
const SignOutRouter = require('./router/sign_out.router');
const AdminRouter = require('./router/admin.router');

//middleware
const signed_in = require('./middleware/signed_in');
const signed_out = require('./middleware/signed_out');
const admin = require('./middleware/admin');
const user = require('./middleware/user');

require('dotenv').config();
const PORT = process.env.PORT || 3030;

const app = express();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

hbs.handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(SignInRouter);
app.use(SignUpRouter);

app.use(signed_in);
app.use(signed_out);
app.use(admin);

app.use(CarsRouter);
app.use(FruitsRouter);
app.use(AnimalsRouter);
app.use(SignOutRouter);
app.use(user);

app.use(UsersRouter);
app.use(AdminRouter);

app.listen(PORT, () => {
    console.log(`Port: ${PORT}. Server is running ...`);
});