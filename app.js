require('dotenv').config();//הפעלת הפונקציה של דוט אי אן ווי
const express=require('express');
const app=express();
const cors=require('cors');
const morgan=require('morgan');
const productRourer=require('./api/v1/routes/product')
const catagoryRourer=require('./api/v1/routes/catagory')
const clientRouter=require('./api/v1/routes/client')
const mongoose=require('mongoose');

//הגדרות חיבור לבסיס הנתונים של מונגו
let mongoPass=process.env.MONGO_PASS;
let mongoUser=process.env.MONGO_USER;
let mongoDbname=process.env.MONGO_DBNAME;
let mongoServer=process.env.MONGO_SERVER;



const mongoConnStr=`mongodb+srv://${mongoUser}:${mongoPass}@${mongoServer}/${mongoDbname}`;
mongoose.connect(mongoConnStr);
var DB=mongoose.Connection;


app.use(morgan('dev'));//שכבת הביניים של מורגן שמטפלת בתיעוד הבקשות מכל סוג
app.use(cors());//הוספת שכבת הביניים של כורס
app.use(express.json());//שכבה המטפלת בבקשות שנשלחו בפורמט גייסון
app.use(express.urlencoded({ extended: true }));//שכבה המטפלת בבקשות שנשלחו בפורמט יו ארל אנקודד

app.use('/product', productRourer);//הפניית בקשות של מוצרים
app.use('/catagory',catagoryRourer);//הפניית בקשות של קטגוריות
app.use('/client',clientRouter);//הפניית בקשות של קטגוריות

app.all('*', (req, res) => {
    res.status(404).json({ Msg: "Not Found 404" });
})

module.exports=app;