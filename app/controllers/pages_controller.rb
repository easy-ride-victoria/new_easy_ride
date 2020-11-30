class PagesController < ApplicationController
  before_action :authenticate_user!
  
  def app
  end
end
