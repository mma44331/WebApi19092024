//נגדיר ראוטר עם כל הניתובים שלו ונייצא אותו
const router = require('express').Router();
const productController = require('../controllers/product');


router.get('/', productController.getAllProduct)
router.get('/:id', productController.getProductById)
router.post('/', productController.addNewProduct)
router.put('/:id', productController.updateproductById)
router.delete('/:id', productController.deleteProduct)



module.exports = router;