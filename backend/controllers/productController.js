const mongoose = require("mongoose");
const { findById } = require("../Models/productModel.js");
const Product = require("../Models/productModel.js")


// Create Product
const createProduct = async(req, res)=>{
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}

// access all product 
const getAllProduct = async (req,res)=>{

    const product = await Product.find()

    res.status(200).json({
        success : true,
        product
    })
}

//update Product --> Admin

const updateProduct = async (req , res) =>{

    let product  =  await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:'Product not found'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id ,req.body,{
        new : true,
        renValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true,
        product
    })
}

//Product Delete

const productDelete = async (req , res)=>{
    
    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:'Product not found'
        })
    }

    await Product.deleteOne({_id : req.params.id})

    res.status(200).json({
        success : true,
        message : "Product is Delete SuccessFully"
    })

}

//get Product Detail

const getProductDetail = async (req,res)=>{

    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:'Product not found'
        })
    }

    res.status(200).json({
        success : true,
        product
    })

}



module.exports = {getAllProduct , createProduct , updateProduct , productDelete , getProductDetail}

