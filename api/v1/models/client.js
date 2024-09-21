const mongoose=require('mongoose')//חיבור לספריית  מונגוס
mongoose.pluralize(null);//ביטול הוספת האות אס באנגלית לאוספים

//הגדרת סכימה עבור אוסף מוצרים
var clientSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    cid:Number,
    cname:String,
    city:String,
    adress:String,
    phone:String    
});

module.exports=mongoose.model('client',clientSchema);//יצירת החיבור לטבלת / אוסף פרודקט


