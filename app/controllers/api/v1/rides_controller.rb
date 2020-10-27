module Api
  module V1
    class RidesController < ApplicationController
      protect_from_forgery with: :null_session
      def index
        rides = Ride.all

        render json: RideSerializer.new(rides).serializable_hash.to_json
      end

      def show
        ride = Ride.find_by(id: params[:id])
        render json: RideSerializer.new(ride).serializable_hash.to_json
      end

      def create
        ride = Ride.new(ride_params)
        if ride.save
          render json: RideSerializer.new(ride).serializable_hash.to_json
        else
          render json: {error: ride.errors.messages}, status: 422
        end
      end

      def update
        ride = Ride.find_by(id: params[:id])
        if ride.update(ride_params)
          render json: RideSerializer.new(ride).serializable_hash.to_json
        else
          render json: {error: ride.errors.messages}, status: 422
        end
      end

      def destroy
        ride = Ride.find_by(id: params[:id])
        if ride.destroy
          head :no_content
        else
          render json: {error: ride.errors.messages}, status: 422
        end
      end


      private

      def ride_params
        params.require(:ride).permit(:user, :horse, :location, :booking_id)
      end


    end
  end
end