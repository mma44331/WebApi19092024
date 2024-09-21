const router=require('express').Router();
const CatagoryController=require('../controllers/catagory')


router.get('/',CatagoryController.getAllCatagory)
router.get('/:id',CatagoryController.getCatagoryById)
router.post('/',CatagoryController.addNewCatagory)
router.put('/:id',CatagoryController.updateCatagoryById)
router.delete('/:id',CatagoryController.deleteCatagory)



module.exports=router;