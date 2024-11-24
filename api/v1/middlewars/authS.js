
module.exports = (req, res, next) => {
    try {
       if(req.session.user==undefined)
       {
        return res.status(500).json({ msg:"Error Authenticating" });
       }      
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg:"Error Authenticating" });
    }
};
