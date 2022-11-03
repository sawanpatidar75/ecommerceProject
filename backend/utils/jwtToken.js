
// Creating token and saving in cookie.

const sendToken = (user, statusCose, res)=> {
    const token  = user. getJWTToken();

    //Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.status(statusCose).cookie('token', token, options).json({
        success: true,
        user,
        token
    })
}

module.exports = sendToken;