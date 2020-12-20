# frozen_string_literal: true

class PagesController < ApplicationController
  before_action :authenticate_user!, only: :app

  def sign_in; end

  def app; end

  protected

  def authenticate_user!
    redirect_to :sign_in unless user_signed_in?
  end
end
