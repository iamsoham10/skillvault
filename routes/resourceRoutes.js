const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const tokenValidator = require('../middlewares/tokenValidator');
const resourceInputValidator = require('../middlewares/resourceValidator');
const { searchLimiter } = require('../middlewares/rateLimiter');

router.use(tokenValidator);
router.post('/new-resource', resourceInputValidator.validateInputSchema, resourceController.createResourceController);
router.get('/all-resources', resourceInputValidator.validateGetResourceSchema, resourceController.getAllResourcesController);
router.put('/update-resource', resourceInputValidator.validateUpdateResourceSchema, resourceController.updateResourceController);
router.delete('/delete-resource', resourceInputValidator.validateDeleteResourceSchema, resourceController.deleteResourceController);
router.get('/search', searchLimiter, resourceInputValidator.validateSearchResourceSchema, resourceController.searchResourcesController);

module.exports = router;