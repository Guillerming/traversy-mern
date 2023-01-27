const express = require('express')
const router = express.Router()
const { setGoal, getGoals, updateGoal, deleteGoal } = require('../controller/goalController')
const { authMiddleware } = require('../middleware/authMiddleware')

router.route('/')
    .get(authMiddleware, getGoals)
    .post(authMiddleware, setGoal)

router.route('/:id')
    .put(authMiddleware, updateGoal)
    .delete(authMiddleware, deleteGoal)

module.exports = router