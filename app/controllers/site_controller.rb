class SiteController < ApplicationController
  include Location
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

    @usuarios = LoadDatum.get_header_data_users(params[:usuarios], session[:access_token])
    LoadDatum.save_media(@usuarios, session[:access_token])

    #puts esta_cerca?([46.3625, 15.114444],[46.055556, 14.508333], 500000)
    
    render 'match'
  end

  def userData
    data = User.find_by_id(params[:id])
    render status:200,json:data
  end

  def mediaData
    data = User.find_by_id(params[:id])
    media = data.media.all 
    render status:200,json:media
  end  
end
