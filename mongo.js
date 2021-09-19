const mongoose = require("mongoose");

const url = `mongodb+srv://simon:${process.env.DB_PSSWD}@cluster0.8webp.mongodb.net/persons_app?retryWrites=true&w=majority`;

mongoose.connect(url, () => {
  console.log("connected to db");
});
