module Api
  module V1
    class CurrentUserController < ApplicationController
      protect_from_forgery with: :null_session
      before_action :authenticate_user!

      def index
        render json: UserSerializer.new(current_user).serializable_hash.to_json
      end
    end
  end
end
