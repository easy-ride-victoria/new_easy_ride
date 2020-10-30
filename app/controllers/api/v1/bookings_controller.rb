module Api
  module V1
    class BookingsController < ApplicationController
      protect_from_forgery with: :null_session
      def index
        bookings = Booking.all

        render json: BookingSerializer.new(bookings,options).serializable_hash.to_json
      end

      def show
        booking = Booking.find_by(id: params[:id])
        render json: BookingSerializer.new(booking, options).serializable_hash.to_json
      end

      def create
        booking = Booking.new(booking_params)
        if booking.save
          render json: BookingSerializer.new(booking).serializable_hash.to_json
        else
          render json: {error: booking.errors.messages}, status: 422
        end
      end

      def update
        booking = Booking.find_by(id: params[:id])
        if booking.update(booking_params)
          render json: BookingSerializer.new(booking, options).serializable_hash.to_json
        else
          render json: {error: booking.errors.messages}, status: 422
        end
      end

      def destroy
        booking = Booking.find_by(id: params[:id])
        if booking.destroy
          head :no_content
        else
          render json: {error: booking.errors.messages}, status: 422
        end
      end


      private

      def booking_params
        params.require(:booking).permit(:event_type, :start_time, :end_time,
          :lesson_price_cad, :lesson_total_spots)
      end

      def options
        @options ||= { include: %i[rides]}
      end

    end
  end
end