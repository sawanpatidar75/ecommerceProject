const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError")




//Create Product
exports.createProduct = catchAsyncError(async (req,res,next) => {
    console.log("Request:",req.body);
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});

//Get all products
exports.getAllProducts = catchAsyncError(async(req,res) => {
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    })
});

//Update product.

exports.updateProduct = catchAsyncError(
    async(req,res,next)=>{
        let product = Product.findById(req.params.id);
    
        if(!product){
            return next(new ErrorHander("Product not found", 404));
        }
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });
        res.status(200).json({
            success:true,
            product
        })
    }
);


//Delete Product

exports.deleteProduct = catchAsyncError(
    async(req,res,next)=>{
        const product = await Product.findById(req.params.id);
    
        if(!product){
            return next(new ErrorHander("Product not found", 404));
        }
    
        await product.remove()
        res.status(200).json({
            success:true,
            message:"Product Delete Successfully"
        })
    }
);

// Get product detail

exports.getProductDetail = catchAsyncError(
    async(req,res,next) => {
        const product = await Product.findById(req.params.id)
    
        if(!product){
            return next(new ErrorHander("Product not found", 404));
        }
        res.status(200).json({
            success:true,
            product
        })
    }
);