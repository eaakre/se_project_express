const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("connected to DB", r);
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  },
  (e) => console.log("DB error", e),
);

const routes = require("./routes");
app.use((req, res, next) => {
  req.user = {
    _id: "659192725d19421b44f90e67",
  };
  next();
});
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
