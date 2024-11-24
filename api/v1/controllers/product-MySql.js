const DbConn = require('../config/MySqlDb');
module.exports = {
    getAllProduct: (req, res) => {
        let Sql = "select * from t_product";
        DbConn.query(Sql, function (error, results, fields) {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);
           
        });
    },
    getProductById: (req, res) => {
        let Sql = `select * from t_product Where pid=${req.params.id}`;
        DbConn.query(Sql, function (error, results, fields) {
            if (error)
                return res.status(500).json(error);
            return res.status(200).json(results);
           
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