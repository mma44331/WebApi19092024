const mysql=require('mysql');

//חיבור לבסיס הנתונים מסוג MySql  
var MySqlDB=mysql.createPool({
    connectionLimit:100,
    database:"ecomDB",
    host:"localhost",
    port:3306,
    user:"meyir",
    password:"mma44331"
});//יצירת חיבור לבסיס הנתונים עם מאמגר קונקשנים מוגדר מראש

module.exports=MySqlDB;
