# frozen_string_literal: true

# This overrides the default Devise response when there is an error on sign in
# It returns a 401 error instead of redirecting
class CustomFailureApp < Devise::FailureApp
  def respond
    self.status = 401
    self.content_type = 'application/json'
    self.response_body = { message: 'Your email or password is incorrect.' }.to_json
  end
end
