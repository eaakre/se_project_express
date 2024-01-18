const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const routes = require("./routes");
const { handleAuthorization } = require("./middlewares/auth");
const { login, createUser } = require("./controllers/users");
const cors = require("cors");

app.use(cors());

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("connected to DB", r);
  },
  (e) => console.log("DB error", e),
);

// app.post("/signin", login);
// app.post("/signup", createUser);
// app.get("/items", items);

app.use(helmet());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
