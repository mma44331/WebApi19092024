const productModel=require('../models/product')
module.exports={
    getAllProduct:(req,res)=>{
        productModel.find().then((prods)=>{
            console.log(prods);
            return  res.status(200).json(prods);
        })
    },
    getProductById:(req,res)=>{
        productModel.find({pid:req.params.id}).then((prods)=>{
            console.log(prods);
            return  res.status(200).json(prods);
        })
    },
    addNewProduct:(req,res)=>{
        productModel.insertMany([req.body]).then((prods)=>{
            console.log(prods);
            return  res.status(200).json(prods);
        })
    }, 
    updateproductById:(req,res)=>{
        productModel.updateOne({pid:req.params.id},req.body).then((prods)=>{
            console.log(prods);
            return  res.status(200).json(prods);
        })
    },
    deleteProduct:(req,res)=>{
        productModel.deleteOne({pid:req.params.id}).then((prods)=>{
            console.log(prods);
            return  res.status(200).json(prods);
        })
    }
};