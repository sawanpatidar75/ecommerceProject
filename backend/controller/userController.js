const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

//Register User.

exports.registerUser = catchAsyncError(async (req, res, next) => {
    console.log("registerUser........")
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is a sample id",
      url: "profilepicUrl",
    },
  });

  sendToken(user,200,res)

});


// LogIn User :-

exports.loginUser = catchAsyncError(async (req,res,next) => {
    const {email,password} = req.body;

    // Checking if user has given password and email both.

    if(!email || ! password){
        return next(new ErrorHander("Please enter Email & Passeord.", 400));
    }
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email or password"),401)
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password"),401);
    }
    
    sendToken(user,200,res)

})

//LogOut User.
exports.logout = catchAsyncError(async(req,res,next)=>{

  res.cookie("token", null,{
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success:true,
    message: "Logged Out"
  })
})


// Forgot Password.
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
  const user = await User.findOne({email:req.body.email});

  if(!user){
    return next(new ErrorHander("User not found", 404))
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({validateBeforeSave: false});

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you not have requested this email then, please ignore it`;

  try {

    await sendEmail({
      email: user.email,
      subject: `ECommerce password recovery`,
      message,

    });

    res.status(200).json({
      success:true,
      message: `Email sent to ${user.email} successfully`,
    })
    
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave: false});

    return next(new ErrorHander(error.message, 500));
    
  }
})


