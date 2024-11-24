const bcrypt = require('bcrypt');//חיבור לספריית בכריפט לצורך הצפנה של הסיסמה לפני השמירה בבסיס הנתונים
const DbConn = require('../config/MySqlDb');
const jwt = require('jsonwebtoken');
const PrivateKey = process.env.PRIVATE_KEY;

//console.log(token);




module.exports = {
    register: (req, res) => {//הרשמה
        const { email, pass, fullname } = req.body;
        let Sql = `select * from t_user where email='${email}'`;
        DbConn.query(Sql, function (error, results, fields) {
            if (error)
                return res.status(500).json(error);
            if (results.length > 0)
                return res.status(400).json({ msg: "User Alreadi Exists" });
            Sql = "insert into t_user (email,pass,fullname) values";

            bcrypt.hash(pass, 10).then((hashPass) => {
                Sql = Sql + `('${email}','${hashPass}','${fullname}')`;
                DbConn.query(Sql, function (error, results, fields) {
                    if (error)
                        return res.status(500).json(error);
                    return res.status(200).json(results);
                });
            }).catch((error) => {
                return res.status(500).json(error);
            });

        });
    },
    login: (req, res) => {//התחברות
        const { email, pass } = req.body;
        let Sql = `select * from t_user where email='${email}'`;
        DbConn.query(Sql, function (error, results, fields) {
            if (error)
                return res.status(500).json(error);
            if (results.length < 1)
                return res.status(400).json({ msg: "User Not Exists" });

            let hashPass = results[0].pass;
            bcrypt.compare(pass, hashPass,(error,loginStatus)=> {
                console.log("arror" + error);
                if (!loginStatus)
                    return res.status(401).json({ msg: "User and / or Pass are wrong" });
                const { email, fullname } = results[0];
               req.session.user={email,fullname};
               console.log(req.session.user);
                return res.status(200).json({ user: results[0].email});
               // const token = jwt.sign({ email, fullname }, PrivateKey, { expiresIn: '1h' });
               // return res.status(200).json({ user: results[0].email, token });
         
            });

        });

    }
};



//בדוגמה זו הגדרנו משתנה שיחזיק את המחרוזת להצפנה בשם pass.