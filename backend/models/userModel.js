const mongoose = require("mongoose");
const validator = require("validator");
const bcript = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name."],
    maxLength: [30, "Name can not exceed 30 character"],
    minLength: [4, "Name should have more then 4 character"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    unique: true,
    validate: [validator.isEmail, "Please enter valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password."],
    minLength: [8, "Password should be greater then 8 character."],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswwordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next()
  }
  this.password = await bcript.hash(this.password,10)
})


// JWT Token
userSchema.methods.getJWTToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcript.compare(enteredPassword,this.password)

}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){

  //Generate Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema.
  this.resetPasswwordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now + 15 * 60 * 1000;
  return resetToken; 
};

module.exports = mongoose.model("User", userSchema);
