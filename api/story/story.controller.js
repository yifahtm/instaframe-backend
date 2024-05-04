import { storyService } from './story.service.js'
import { socketService } from '../../services/socket.service.js'
import { logger } from '../../services/logger.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'

export async function getStories(req, res) {
    try {
        const stories = await storyService.query(req.query)
        res.send(stories)
    } catch (err) {
        logger.error('Failed to get stories', err)
        res.status(500).send({ err: 'Failed to get stories' })
    }
}

export async function getStoryById(req, res) {
    try {
        const storyId = req.params.id
        const story = await storyService.getStoryById(storyId)
        res.json(story)
    } catch (err) {
        logger.error('Failed to get story', err)
        res.status(500).send({ err: 'Failed to get story' })
    }
}

export async function addStory(req, res) {
    try {
        const story = req.body
        // car.owner = loggedinUser
        const addedStory = await storyService.add(story)
        res.json(addedStory)
    } catch (err) {
        logger.error('Failed to add story', err)
        res.status(500).send({ err: 'Failed to add story' })
    }
}


export async function updateStory(req, res) {
    try {
        const story = req.body
        const updatedStory = await storyService.update(story)
        // socketService.emitToUser({ type: 'new-reacting-activity', data: story, userId: updatedStory.by._id })
        res.json(updatedStory)
    } catch (err) {
        logger.error('Failed to update story', err)
        res.status(500).send({ err: 'Failed to update story' })

    }
}

export async function storyNotification(req, res) {
    console.log('here')
    try {
        const story = req.body
        console.log(story)
        console.log('IM HEREE')

        socketService.emitToUser({ type: 'new-reacting-activity', data: story, userId: story.storyBy._id })
    } catch (err) {
        logger.error('Failed to send notification', err)
    }
}

export async function removeStory(req, res) {
    try {
        const storyId = req.params.id
        const removedId = await storyService.remove(storyId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove story', err)
        res.status(500).send({ err: 'Failed to remove story' })
    }
}

