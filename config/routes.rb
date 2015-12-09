Rails.application.routes.draw do

  get '/' => 'site#validate'
  get '/home' => 'site#home'
  get '/match' => 'site#home'
  post '/match' => 'site#match'

end
