const jwt=require('jsonwebtoken');
const PrivateKey=process.env.PRIVATE_KEY;
module.exports = (req, res, next) => {
    try {
        const authStr=req.headers.authorization;
        // bearer ל token
        const arr = authStr.split(' ');
        const token = arr[1];
        const userObj=jwt.verify(token,PrivateKey);
        
        req.email=userObj.email;
        // try catch
       
       
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg:"Error Authenticating" });
    }
};
