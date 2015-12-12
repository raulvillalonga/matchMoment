Rails.application.routes.draw do

  get '/' => 'site#validate'
  get '/home' => 'site#home'
  get '/match' => 'site#home'
  post '/match' => 'site#match'
  get '/api/user/:id' => 'site#userData'
  get '/api/media/:id' => 'site#mediaData'

end
