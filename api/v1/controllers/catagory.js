const catagoryModel=require('../models/catagory')
module.exports={
    getAllCatagory:(req,res)=>{
        catagoryModel.find().then((gatagos)=>{
            console.log(gatagos);
            return  res.status(200).json(gatagos)
        })
    },
    getCatagoryById:(req,res)=>{
        catagoryModel.find({cid:req.params.id}).then((gatagos)=>{
            console.log(gatagos);
            return  res.status(200).json(gatagos)
        })
        
    },
    addNewCatagory:(req,res)=>{
        catagoryModel.insertMany([req.body]).then((gatagos)=>{
            console.log(gatagos);
            return  res.status(200).json(gatagos);
        })
    },
    updateCatagoryById:(req,res)=>{
        catagoryModel.updateOne({cid:req.params.id},req.body).then((gatagos)=>{
            console.log(gatagos);
            return  res.status(200).json(gatagos);
        })
    },
    deleteCatagory:(req,res)=>{
        catagoryModel.deleteOne({cid:req.params.id}).then((gatagos)=>{
            console.log(gatagos);
            return  res.status(200).json(gatagos);
        })
        
    }
};