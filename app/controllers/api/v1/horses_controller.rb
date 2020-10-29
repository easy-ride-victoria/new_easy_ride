module Api
  module V1
    class HorsesController < ApplicationController
      protect_from_forgery with: :null_session
      def index
        horses = Horse.all

        render json: HorseSerializer.new(horses).serializable_hash.to_json
      end

      def show
        horse = Horse.find_by(id: params[:id])
        render json: HorseSerializer.new(horse).serializable_hash.to_json
      end

      def create
        horse = Horse.new(horse_params)
        if horse.save
          render json: HorseSerializer.new(horse).serializable_hash.to_json
        else
          render json: {error: horse.errors.messages}, status: 422
        end
      end

      def update
        horse = Horse.find_by(id: params[:id])
        if horse.update(horse_params)
          render json: HorseSerializer.new(horse).serializable_hash.to_json
        else
          render json: {error: horse.errors.messages}, status: 422
        end
      end

      def destroy
        horse = Horse.find_by(id: params[:id])
        if horse.destroy
          head :no_content
        else
          render json: {error: horse.errors.messages}, status: 422
        end
      end


      private

      def horse_params
        params.require(:horse).permit(:profile_picture, :name, :breed, :date_of_birth, :active)
      end

    end
  end
end