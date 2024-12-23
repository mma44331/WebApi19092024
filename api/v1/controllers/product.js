const DbConn = require('../config/MySqlDb');
module.exports = {
    getAllProduct: (req, res) => {
        let Sql = "select * from t_product";
        DbConn.query(Sql, function (error, results, fields) {
            if (error)
                return res.status(500).json(error);
            //return res.status(200).json(results);
            console.log(results);

            //    const products = [
            // { pid: 4, pname: "bread", picname: "bread.jpg", price: 14.9 },
            // { pid: 5, pname: "milk", picname: "milk.jpg", price: 36.9 },
            // { pid: 9, pname: "cookie", picname: "cookie.jpg", price: 10.9 },
            // { pid: 4, pname: "bread", picname: "bread.jpg", price: 6.9 },
            // { pid: 5, pname: "milk", picname: "milk.jpg", price: 145.9 },
            // { pid: 9, pname: "cookie", picname: "cookie.jpg", price: 11.9 }
            // ];
            const user = { fname: "meyir", lname: "aush" };
            return res.status(200).render('products', { layout: 'main', title: 'my product', user, products: results });



        });
    },
    getProductById: (req, res) => {
        let Sql = `select * from t_product Where pid=${req.params.id}`;
        DbConn.query(Sql, function (error, results, fields) {
            if (error)
                return res.status(500).json(error);
            return res.status(200).render('products', { layout: 'main', title: 'my product',products: results });

        });
    },
    addNewProduct: (req, res) => {
        let prod = req.body;
        let Sql = `insert into t_products (pname,price,pdesc,picname) values ('${prod.pname}','${prod.price}','${prod.pdesc}','${prod.picname}')`;
        DbConn.query(Sql, function (error, results, fields) {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);

        });
    },
    updateproductById: (req, res) => {
        productModel.updateOne({ pid: req.params.id }, req.body).then((prods) => {
            console.log(prods);
            return res.status(200).json(prods);
        })
    },
    deleteProduct: (req, res) => {
        productModel.deleteOne({ pid: req.params.id }).then((prods) => {
            console.log(prods);
            return res.status(200).json(prods);
        })
    }
};