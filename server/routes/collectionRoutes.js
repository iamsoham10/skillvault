const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const tokenValidator = require('../middlewares/tokenValidator');

router.use(tokenValidator);
router.post('/new-collection', collectionController.createCollectionController);
router.get('/all-collection', collectionController.getCollectionsController);
router.post('/share-collection', collectionController.shareCollectionController);
router.post('/search-collection', collectionController.searchCollectionController);

module.exports = router;