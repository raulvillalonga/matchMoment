
class SiteController < ApplicationController


  Instagram.configure do |config|
    config.client_id = "7558aa55fdb94c549b6b0802ad8d656a"
    config.client_secret = "91c74642882b418f9d1a15699f536ac5"
  end

  def validate
    if session[:access_token] == nil
      session[:access_token] = nil
      redirect_to 'https://api.instagram.com/oauth/authorize/?client_id=7558aa55fdb94c549b6b0802ad8d656a&redirect_uri=http://localhost:3000/home&response_type=code&scope=public_content'    
    end
    render 'home'
  end

  def home
    if session[:access_token] == nil
      response = Instagram.get_access_token(params[:code], :redirect_uri => "http://localhost:3000/home")
      session[:access_token] = response.access_token
    end 
    render 'home'
  end

  def match

    usuarios = params[:usuarios]     
    client = Instagram.client(:access_token => session[:access_token])
    binding.pry
    @html1 = "<div class='row'><div class='col-md-12'>"


    usuarios.each do |usu| 
      for user in client.user_search(usu[1])
        @html1 += "<div class='usu-name'> #{user.username}<br><img src='#{user.profile_picture}' height='100px'></div>"
      end
    end 
    @html1 += "</div></div>"
    render 'match'
  end

end
