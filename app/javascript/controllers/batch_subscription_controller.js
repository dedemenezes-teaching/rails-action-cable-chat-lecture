import { Controller } from 'stimulus'
import consumer from '../channels/consumer'

export default class extends Controller {
  static values = {
    chatroomId: Number
  }

  static targets = ['messages', 'form']

  connect() {
    this.channel = consumer.subscriptions.create(
      { channel: "BatchChannel", id: this.chatroomIdValue },
      { received: data => this.#insertMessageAndScrollDown(data) }
    )
  }

  disconnect() {
    console.log("You have been usubscribed")
    this.channel.unsubscribe()
  }

  #insertMessageAndScrollDown(data) {
    this.messagesTarget.insertAdjacentHTML('beforeend', data)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
    this.formTarget.reset()
  }
}
