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
      #user_id, horse_id, location, booking obj {start_time, end_time, event_type}
      def create
        if params.key? :booking
          # this is for rides creation where we have to create the booking and the ride at the same time
          booking = Booking.new({
            event_type: params[:booking][:event_type],
            start_time: params[:booking][:start_time],
            end_time: params[:booking][:end_time]
          })
          ride = Ride.new({user_id: params[:user_id], horse_id: params[:horse_id] , booking: booking})
          if booking.valid?
            if ride.valid?
              booking.save!
              ride.save!
              render json: RideSerializer.new(ride).serializable_hash.to_json
            else
              render json: {error: ride.errors.messages}, status: 422
            end
          else
            render json: {error: booking.errors.messages}, status: 422
          end
        else
          # this is for rides that are attached to a lesson
          # in this case the booking already exists
          ride = Ride.new(ride_params)
          if ride.save
            render json: RideSerializer.new(ride).serializable_hash.to_json
          else
            render json: {error: ride.errors.messages}, status: 422
          end
        end 
      end

      def update
        #we are getting a booking_id  = 10 from react
        # over in the Rails, we are using the 10 id to check on another column "id", booking_id

        ride = Ride.find_by(id: params[:id])
        # PUT /api/v1/rides/123
        # {user_id:42, horse_id:2, location: "outdoor", booking:{start_time:"..." , end_time: "..." }}
        unless params[:booking].nil?
          ride.booking.update(start_time: params[:booking][:start_time], end_time: params[:booking][:end_time])
        end

        if ride.update(ride_params)
          puts "EVERYTHING WORKED"
          render json: RideSerializer.new(ride).serializable_hash.to_json
        else
          puts "THERE WAS AN ERROR"
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
        params.require(:ride).permit(
          :user_id, :horse_id, :location, :booking_id, :lesson_payment_id, :lesson_payment_type,
          :cancellation_requested_at, booking: [:event_type, :start_time, :end_time])
      end

    end
  end
end