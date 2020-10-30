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
# user_id, horse_id, location, booking obj {start_time, end_time, event_type}
      def create
        user = User.find_by(email: params[:email])
        puts user
        horse = Horse.find_by(name: params[:horse])
        puts horse
        start_time = "2020-10-29T15:15:00.000Z"
        end_time = "2020-10-29T16:15:00.000Z"
        booking = Booking.new({start_time: start_time, end_time: end_time, event_type: "lesson"})
        if booking.save
          ride = Ride.new({user: user, horse: horse , booking: booking})
          if ride.save
            render json: RideSerializer.new(ride).serializable_hash.to_json
          else
            # TODO: should we delete the booking here?
            render json: {error: ride.errors.messages}, status: 422
          end
        else
          render json: {error: booking.errors.messages}, status: 422
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
        # puts params
        params.require(:ride).permit(:user_id, :horse_id, :location, :booking_id, :booking)
      end

    end
  end
end