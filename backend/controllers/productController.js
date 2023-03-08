const Product = require("../Models/productModel.js")
const ErrorHandler = require("../util/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../util/apifeatures.js");



// Create Product -- Admin
const createProduct = catchAsyncError(async(req, res)=>{
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})

// access all product 
const getAllProduct = catchAsyncError(async (req,res)=>{

    const resultPerPage = 3
    const productCount = await Product.countDocuments()
    
    const apiFeature = new ApiFeatures(Product.find() , req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
    const product = await apiFeature.query

    res.status(200).json({
        success : true,
        product,
        productCount
    })
})

//update Product --> Admin

const updateProduct = catchAsyncError(async (req , res , next) =>{

    let product  =  await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 400))
    }

    product = await Product.findByIdAndUpdate(req.params.id ,req.body,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true,
        product
    })
})

//Product Delete

const productDelete = catchAsyncError( async (req , res , next)=>{
    
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 400))
    }

    await Product.deleteOne({_id : req.params.id})

    res.status(200).json({
        success : true,
        message : "Product is Delete SuccessFully"
    })

})

//get Product Detail

const getProductDetail = catchAsyncError(async (req,res , next)=>{

    const product = await Product.findById(req.params.id)

    if(!product){
       return next(new ErrorHandler("Product not found", 400))
    }
    
    res.status(200).json({
        success : true,
        product
    })
})



module.exports = {getAllProduct , createProduct , updateProduct , productDelete , getProductDetail}



