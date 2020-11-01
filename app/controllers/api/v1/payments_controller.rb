module Api
  module V1
    class PaymentsController < ApplicationController
      protect_from_forgery with: :null_session
      # endpoint: POST /api/v1/payments
      def create
        payload = {
          "source_id": params[:nonce],
          "verification_token": params[:token],
          "autocomplete": true,
          "location_id": SQUARE_SANDBOX_LOCATION_ID,
          "amount_money": { # amount_money = $100.00
            "amount": params[:amount] * 100,
            "currency": params[:currency]
          },
          "idempotency_key": SecureRandom.uuid
        }
        url = 'https://connect.squareupsandbox.com/v2/payments'
        res = HTTP.auth("Bearer #{SQUARE_SANDBOX_ACCESS_TOKEN}").post(url, body: payload.to_json)
        render json: res.body
      end
    end
  end
end
