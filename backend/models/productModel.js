const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true
    },
    description:{
        type: String,
        required:[true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true, "Please enter product price."],
        maxLength:[8,"Price can not exceed 8 character."]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    }],
    category:{
        type:String,
        required:[true,"Please enter product category."]
    },
    stock:{
        type: Number,
        required:[true,"Please enter product stock"],
        maxLength:[4,"Stock can't exceed 4 characters."],
        default:1
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
        
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                require:true
            }
        }
    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("CollectioEcom", productSchema)