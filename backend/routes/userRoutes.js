const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser } = require('../controller/userController')
const { authMiddleware } = require('../middleware/authMiddleware')

router.post('/new', registerUser)
router.post('/login', loginUser)
router.get('/me', authMiddleware, getUser)

module.exports = router