if (process.env.NODE_ENV !== "production") {
    const result = require("dotenv").config();
    if (result.error) {
        console.error("Error loading .env file", result.error);
    } else {
        console.log("Environment variables:", result.parsed);
    }
}

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", __dirname + "/view");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log("Connected to mongoose"));

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.listen(process.env.PORT || 4000);
