const router = require('express').Router();

const apiCategoryRouter = require('./api/categories.routes');
const apiModuleRouter = require('./api/modules.routes');
const apiCardRouter = require('./api/cards.routes');
const apiUserRouter = require('./api/user.routes');

const apiAuthRouter = require('./api/auth.routes');
router.use('/api/auth', apiAuthRouter);

router.use('/api/categories', apiCategoryRouter);
router.use('/api/modules', apiModuleRouter);
router.use('/api/cards', apiCardRouter);
router.use('/api/user', apiUserRouter);

module.exports = router;
