class SiteController < ApplicationController

  def validate
    if session[:access_token] == nil      
      url = InstagramApi.get_url()
      redirect_to url
    else
      render 'home'
    end
  end

  def home
    if session[:access_token] == nil
      session[:access_token] = InstagramApi.save_token(params[:code])
    end 
    render 'home'
  end

  def match
    @usuarios = InstagramApi.load_header_users(params[:usuarios], session[:access_token])
    render 'match'
  end
end
