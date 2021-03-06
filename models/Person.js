const { Schema, model } = require("mongoose");

const personSchema = new Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  number: {
    type: String,
    minlength: 3,
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = model("Person", personSchema);

module.exports = Person;
