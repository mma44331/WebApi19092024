const router=require('express').Router();
const ClientController=require('../controllers/client')


router.get('/',ClientController.getAllClient)
router.get('/:id',ClientController.getClientById)
router.post('/',ClientController.addNewClient)
router.put('/:id',ClientController.updateClientById)
router.delete('/:id',ClientController.deleteClient)



module.exports=router;