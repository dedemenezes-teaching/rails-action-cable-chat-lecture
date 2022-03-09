class MessagesController < ApplicationController
  def create
    chatroom = Chatroom.find(params[:chatroom_id])
    @message = Message.new(message_params)
    # assign chatroom and user to the message
    @message.user = current_user
    @message.chatroom = chatroom
    if @message.save
      # redirect_to chatroom_path(chatroom)
      BatchChannel.broadcast_to(
        chatroom,
        render_to_string(partial: 'message', locals: { message: @message })
      )
    else
      render 'chatroom/show', message: @message
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
