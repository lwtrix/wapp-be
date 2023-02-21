import express from "express";
import { isSignedIn } from "../../lib/auth/isSignedIn.js";
import Users from "../users/model.js";
import Chats from "./model.js";

const chatsRouter = express.Router()

chatsRouter.post('/:userId', isSignedIn, async (req, res, next) => {
    try {
        const { userId } = req.params

        const foundUser = await Users.findById(userId)
        const currentUser = await Users.findById(req.user._id)

        if(foundUser) {
            const newChat = new Chats()
            newChat.members.push(foundUser)
            newChat.members.push(currentUser)

            const chat = await newChat.save()

            res.status(201).send(chat)
        } else {
            res.status(404).send({ message: 'The user you are trying to create a chat with does not exist'})
        }
    } catch (error) {
        next(error)
    }
})
chatsRouter.get('/', isSignedIn, async (req, res, next) => {
    try {
        const chats = await Chats.find({ members: req.user._id}).populate('members').populate('messages')
        
        if(chats) {
            res.send(chats)
        } else {
            res.status(404).send([])
        }
    } catch (error) {
        next(error)
    }
})
chatsRouter.get('/', async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

export default chatsRouter