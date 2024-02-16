const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (r) => {
  console.log("connected to DB", r);
});

app.use(helmet());
app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
  console.error(err);
  return res.send({ message: err.message });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
