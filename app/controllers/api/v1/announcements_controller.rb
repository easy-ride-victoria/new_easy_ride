module Api
  module V1
    class AnnouncementsController < ApplicationController
      protect_from_forgery with: :null_session
      def index
        announcements = Announcement.all

        render json: AnnouncementSerializer.new(announcements).serializable_hash.to_json
      end

      def show
        announcement = Announcement.find_by(id: params[:id])
        render json: AnnouncementSerializer.new(announcement).serializable_hash.to_json
      end

      def create
        announcement = Announcement.new(announcement_params)
        if announcement.save
          render json: AnnouncementSerializer.new(announcement).serializable_hash.to_json
        else
          render json: {error: announcement.errors.messages}, status: 422
        end
      end

      def update
        announcement = Announcement.find_by(id: params[:id])
        if announcement.update(announcement_params)
          render json: AnnouncementSerializer.new(announcement).serializable_hash.to_json
        else
          render json: {error: announcement.errors.messages}, status: 422
        end
      end

      def destroy
        announcement = Announcement.find_by(id: params[:id])
        if announcement.destroy
          head :no_content
        else
          render json: {error: announcement.errors.messages}, status: 422
        end
      end


      private

      def announcement_params
        params.require(:announcement).permit(:title, :start_date, :end_date)
      end

    end
  end
end