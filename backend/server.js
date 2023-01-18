const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose.set("strictQuery", false);

require("./models/list");
require("./models/task");

app.use(express.json());
app.use(require("./routes/list"));
app.use(require("./routes/task"));

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("mongoose not connected", err);
  });

app.listen(3000, () => {
  console.log("Sever running port 3000!");
});
