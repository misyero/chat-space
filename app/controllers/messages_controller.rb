class MessagesController < ApplicationController
  
  def index
    @group = Group.all
  end
end
