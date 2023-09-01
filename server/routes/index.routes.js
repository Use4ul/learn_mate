const router = require('express').Router();

const apiGameRouter = require('./api/games.routes');

router.use('/api/games', apiGameRouter);

module.exports = router;
