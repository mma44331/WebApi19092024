const mongoose=require('mongoose')//חיבור לספריית  מונגוס
mongoose.pluralize(null);//ביטול הוספת האות אס באנגלית לאוספים

//הגדרת סכימה עבור אוסף מוצרים
var productSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    pid:Number,
    pname:String,
    price:Number    
});

module.exports=mongoose.model('product',productSchema);//יצירת החיבור לטבלת / אוסף פרודקט


