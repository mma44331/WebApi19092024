const ClientModel=require('../models/client')
module.exports={
    getAllClient:(req,res)=>{
        ClientModel.find().then((Clients)=>{
            console.log(Clients);
            return  res.status(200).json(Clients)
        })
    },
    getClientById:(req,res)=>{
        ClientModel.find({cid:req.params.id}).then((Clients)=>{
            console.log(Clients);
            return  res.status(200).json(Clients)
        })
        
    },
    addNewClient:(req,res)=>{
        ClientModel.insertMany([req.body]).then((Clients)=>{
            console.log(Clients);
            return  res.status(200).json(Clients);
        })
    },
    updateClientById:(req,res)=>{
        ClientModel.updateOne({cid:req.params.id},req.body).then((Clients)=>{
            console.log(Clients);
            return  res.status(200).json(Clients);
        })
    },
    deleteClient:(req,res)=>{
        ClientModel.deleteOne({cid:req.params.id}).then((Clients)=>{
            console.log(Clients);
            return  res.status(200).json(Clients);
        })
        
    }
};