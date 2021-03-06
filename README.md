# TalkTalk

[![Greenkeeper badge](https://badges.greenkeeper.io/mitoai/talktalk.svg?token=77baee5e5e9071c5ef5ff7d73561bd069a34d6364133d57969f75a5b6c844a8a&ts=1503922616970)](https://greenkeeper.io/)

A small framework for building chatbots. Independent of chatbot platform or NLU service.

## Usage

TalkTalk consists of dispatchers and handlers. The dispatcher keeps track of the conversation 
defined by the handlers. Conversations follows the following pattern:

```js
import {Handler, Dispatcher} from 'talktalk'

const dispatcher = new Dispatcher(/* Logic for handling replies */)

class  ExampleHandler extends Handler {

  intent = 'someIntent'/* Define an intent, iff this handler should be limited to this */

  handleFirstMessage(message) {

    // Handle the first message. Iff this handler should 
    // reply, send a reply using the function 

    this.sendReply( /* Your reply */ )

    // If not, return undefined as soon as possible
    // then the next appropriate handler will be called.

    // Return a context iff this handler should handle the
    // next message from the user
  }
  
  handleSessionMessage(message, context) {
    // This will be called on subsequent message
    // if the `handleFirstMessage` returned a context.
    
    // If the message can't be handled by this handler
    // return undefined and do not send a reply. 
  }
  
  handleJump(jumpContext) {
    // Method for handling jumps from other handlers
    // This is very useful for more advanced usage 
    
    // Jumps can be performed by calling the method:
    
    this.jumpTo(ExampleHandler, {} /* Some jump context */)
    
  }
  
  handlePostback(postbackContext) {
    // Method for handling postbacks
    
    // Postbacks can be generated by calling
    dispatcher.buildPostback(ExampleHandler, { /* Some postback context */ })
  }
}

dispatcher.registerHandler(ExampleHandler)


dispatcher.handleMessage({/* Message to handle */})
```



Please see the [github.com/mitoai/talktalk-examples](https://github.com/mitoai/talktalk-examples) repo for examples. Talk talk is also showed in the [following talk at JavaZone 2017](https://vimeo.com/233785261).

