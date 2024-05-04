import express from 'express'
import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { getStories, getStoryById, addStory, updateStory, removeStory, storyNotification } from './story.controller.js'
export const storyRoutes = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', log, getStories)
storyRoutes.get('/', getStories)
storyRoutes.get('/:id', getStoryById)
storyRoutes.post('/', requireAuth, addStory)
storyRoutes.put('/:id', updateStory)
storyRoutes.post('/notification', storyNotification)
storyRoutes.delete('/:id', removeStory)

// router.post('/:id/msg', requireAuth, addCarMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeCarMsg)

