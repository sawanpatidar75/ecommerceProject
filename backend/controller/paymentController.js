const catchAsyncErrors = require("../middleware/catchAsyncError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,    
        currency: "inr",
        payment_method: req.body.id,
        confirm: true,
        // metadata: {
        //     company: "Ecommerce",
        // },
    });
    // const myPayment = await stripe.paymentIntents.create({
    //     amount: req.body.amount,
    //     currency: 'inr',
        // payment_method_types: ['card'],
    //   });
    res.status(200).json({ success: true, message: "Payment Successfully", status: myPayment.status })

});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
})

