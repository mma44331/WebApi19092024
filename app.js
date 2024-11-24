const jwt = require('jsonwebtoken');

//הגדרת מחרוזת עם מפתח פרטי //;"YaronLapidot="PrivateKey const

//הגדרות חיבור לבסיס הנתונים של מונגו

require('dotenv').config();//הפעלת הפונקציה של דוט אי אן ווי
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const productRourer = require('./api/v1/routes/product')
const catagoryRourer = require('./api/v1/routes/catagory')
const clientRouter = require('./api/v1/routes/client')
const mongoose = require('mongoose');
const userRouter = require('./api/v1/routes/user');
const mysql = require('mysql');
const authMiddle = require('./api/v1/middlewars/auth');
const authSMiddle = require('./api/v1/middlewars/authS');
const session=require('express-session');//
const mongoStore=require('connect-mongo');
const hbs=require('express-handlebars');
const multer=require('multer');

app.set('views','./views');//הגדרת תקיית התצוגה, שמכילה את קבצי התצוגה,
//הגדרת זו נועדה כדי לומר לאקספרס היכן לחפש את התצוגות

app.engine('hbs',hbs.engine({
    extname:'hbs',//סיומת הקבצים השייכים למערכת התבניות
    defaultView: 'index',//תצוגת ברירת מחדל שנציג במידה ולא ציינו שם של תצוגה
    layoutsDir:__dirname+'/views/layouts/',//הגדרת הנתיב לתיקיית תבניות התצוגה - מאסטר פייג
    partialsDir:__dirname+'/views/partials/'///הגדרת הנתיב לתקייה של תצוגות חלקיות, סוג של קומפוננטות תצוגה, יחידות תצוגה עצמאיות
}));

app.set('view engine', 'hbs');//הגדרת מנוע תצוגה הפעיל
app.use(express.static('public'));//הגדרת התיקייה פאליק בתיקייה סטאטית ממנה ניתן להגיד קבצים סטאטיים שלא עוברים עיבוד בצד שרת
app.use('/assets/',express.static('pub'));//כנ"ל לגבי תיקיית פאב, רק עם תוספת של נתיב ווירטואלי 
app.use(express.static('test'));

const PrivateKey = process.env.PRIVATE_KEY;

let mongoPass = process.env.MONGO_PASS;
let mongoUser = process.env.MONGO_USER;
let mongoDbname = process.env.MONGO_DBNAME;
let mongoServer = process.env.MONGO_SERVER;



const mongoConnStr = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoServer}/${mongoDbname}`;
mongoose.connect(mongoConnStr);
var DB = mongoose.Connection;

app.use(session({
    secret:PrivateKey,
    resave:true,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        path:'/',
        secure:false,
        maxAge:null
    },
    store:mongoStore.create({
        mongoUrl: `mongodb+srv://${mongoUser}:${mongoPass}@${mongoServer}`
    })
}))


//app.use(bcrypt());

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.fieldname=='ProdPicName')
            cb(null,'./public/uploads/pics/')
        else if(file.fieldname=='profilevideo')
            cb(null,'./public/uploads/vod/')
        else
        cb(null,'./public/uploads/filse/')
    },
    filename:(req,file,cb)=>{
        let filename=Math.floor(Math.random()*100000);
        let fileExtension=file.originalname.split('.').pop();
        let fullname=filename+"."+fileExtension;
        if(file.fieldname=='ProdPicName')
            req.body.picName=fullname;
        cb(null,fullname);
    }
});
const upload=multer({storage:storage});
//const upload=multer({dest:'./public/uploads/pics'})
app.use(morgan('dev'));//שכבת הביניים של מורגן שמטפלת בתיעוד הבקשות מכל סוג
app.use(cors());//הוספת שכבת הביניים של כורס
app.use(express.json());//שכבה המטפלת בבקשות שנשלחו בפורמט גייסון
app.use(express.urlencoded({ extended: true }));//שכבה המטפלת בבקשות שנשלחו בפורמט יו ארל אנקודד
app.use('/product', upload.single('ProdPicName'),productRourer);
//app.use('/product', authSMiddle, productRourer);
app.use('/catagory',authMiddle, catagoryRourer);//הפניית בקשות של קטגוריות
app.use('/client', clientRouter);//הפניית בקשות של קטגוריות
app.use('/user', userRouter);

app.all('*', (req, res) => {
    res.status(404).json({ Msg: "Not Found 404" });
});

module.exports = app;