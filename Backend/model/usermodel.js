const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      // Example of a validator
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid username!`,
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (email) {
          if (typeof email != undefined) {
            let isValidEmail = validator.isEmail(email);
            return isValidEmail;
          } else {
            console.error("email is undefined");
            return false;
          }
        },
      },
      // Using built-in validator
    //   match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      // }),
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, 'Password must be at least 6 characters long']
    //   validate: {
    //     validator: function (v) {
    //       return v.length > 8;
    //     },
    //   },
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
