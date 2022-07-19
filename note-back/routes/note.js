import express from 'express'
const router = express.Router()

import { noteController } from '../controllers'

router.get('/', noteController.getAll)
router.get('/:id', noteController.get)
router.post('/', noteController.create)
router.put('/:id', noteController.update)
router.delete('/:id', noteController.delete)

export default router
