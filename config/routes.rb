Rails.application.routes.draw do

  get '/' => 'site#home'
  get '/match' => 'site#home'
  post '/match' => 'site#match'

end
