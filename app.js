const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
require("./db/connet");

const app = express();
const port = process.env.PORT || 5000;

//Passing middleware
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//Static files
app.use(express.static("public"));

//Template Engine
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

//Routes
const routes = require("./routes/users");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Sever is Running on ${port}`);
});
