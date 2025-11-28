import { Router } from 'express'
import { auth } from '../../middleware/authMiddleware'
import { ChatService } from './ChatService'


const chatRouter = Router({
  mergeParams: true,
})
const ChatServices = new ChatService()

chatRouter.get('/:id', auth, ChatServices.getChat.bind(ChatServices))
chatRouter.post(
  '/Create-Group',
  auth,
  ChatServices.CreateGroupChat.bind(ChatServices)
)
chatRouter.get(
  '/get-group-chat/:groupId',
  auth,
  ChatServices.getGroupChat.bind(ChatServices)
)
export default chatRouter
