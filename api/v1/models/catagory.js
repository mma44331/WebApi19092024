const mongoose=require('mongoose')//חיבור לספריית  מונגוס
mongoose.pluralize(null);//ביטול הוספת האות אס באנגלית לאוספים

//הגדרת סכימה עבור אוסף מוצרים
var catagorySchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    cid:Number,
    cname:String,
    catagoryTypes:Number    
});

module.exports=mongoose.model('catagory',catagorySchema);//יצירת החיבור לטבלת / אוסף פרודקט

