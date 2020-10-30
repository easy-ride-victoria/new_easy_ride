module Api
  module V1
    class ReportsController < ApplicationController
      protect_from_forgery with: :null_session
      
      def index
        reports = Report.all

        render json: ReportsSerializer.new(reports).serializable_hash.to_json
      end

      def show
        report = Report.find_by(id: params[:id])
        render json: ReportSerializer.new(report).serializable_hash.to_json
      end

      def create
        user = User.find_by(email: params[:email])
        puts user
        horse = Horse.find_by(name: params[:horse])
        puts horse
        ride = Ride.new({user: user, horse: horse , booking: booking})
        report = Report.new({user: user, horse: horse, report_params)
        if report.save
          render json: ReportSerializer.new(report).serializable_hash.to_json
        else
          render json: {error: report.errors.messages}, status: 422
        end
      end

      def update
        report = Report.find_by(id: params[:id])
        if report.update(report_params)
          render json: HorseSerializer.new(report).serializable_hash.to_json
        else
          render json: {error: report.errors.messages}, status: 422
        end
      end

      def destroy
        report = Rpoert.find_by(id: params[:id])
        if report.destroy
          head :no_content
        else
          render json: {error: report.errors.messages}, status: 422
        end
      end


      private

      def report_params
        params.require(:report).permit(:profile_picture, :name, :breed, :date_of_birth, :active)
      end

    end
  end
end