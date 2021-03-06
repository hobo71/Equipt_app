# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV['CORS_ORIGINS'].split(',').map { |origin| origin.strip }
    resource '*',
      headers: :any,
      methods: %i(get post put patch delete options head)
  end
end
