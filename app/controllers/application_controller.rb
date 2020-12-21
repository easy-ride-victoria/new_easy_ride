# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # We use json for our API and most Devise routes
  # html is needed for the reset password form
  respond_to :json, :html
end
