require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)
Dotenv::Railtie.load
SQUARE_SANDBOX_LOCATION_ID = ENV['SQUARE_SANDBOX_LOCATION_ID']
SQUARE_SANDBOX_ACCESS_TOKEN = ENV['SQUARE_SANDBOX_ACCESS_TOKEN']
module EasyRide
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    config.time_zone = "America/Vancouver"
    config.active_record.default_timezone = :local
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
