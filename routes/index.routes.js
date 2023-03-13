const {Router} = require('express')
const postRoutes = require('./posts.routes')
const userRoutes = require('./users.routes')
const commentsRoutes = require('./comments.routes')
const router = Router()

router.use('/v1',postRoutes )
router.use('/v1', userRoutes)
router.use('/v1', commentsRoutes)

module.exports = router