// @flow
import type { BaseMessage } from './dispatcher'

export default class Handler<Context: {}, JumpContext: {}, Message: BaseMessage, Reply: {}> {
  hasSentReply: boolean = false
  jumper: ?(() => Promise<{ handler: Handler<*, *, Message, Reply>, context: * }>)
  intent: ?string
  replier: (r: Reply) => Promise<*>
  sender: string

  constructor (replier: (r: Reply) => Promise<*>, sender: string) {
    this.replier = replier
    this.sender = sender
  }

  async handleMessage (message: Message, context: ?Context): Promise<?Context> {
    if (!context) {
      if (this.intent && this.intent !== message.intent) {
        return null
      }
      return this.handleFirstMessage(message)
    }
    return this.handleSessionMessage(message, context)
  }

  async handleFirstMessage (message: Message): Promise<?Context> {

  }

  async handleSessionMessage (message: Message, context: Context): Promise<?Context> {

  }

  async handleJump (context: JumpContext): Promise<?Context> {

  }

  async sendReply (reply: Reply): Promise<*> {
    this.hasSentReply = true
    await this.replier(reply)
  }

  jumpTo<C: {}, RC: {}> (_Handler: Class<Handler<C, RC, Message, Reply>>, context: RC) {
    this.jumper = async () => {
      const handler = new _Handler(this.replier, this.sender)
      const newContext: ?C = await handler.handleJump(context)
      return {handler, context: newContext}
    }
  }
}
