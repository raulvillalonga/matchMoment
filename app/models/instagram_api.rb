class InstagramApi

  CALLBACK_URL = 'http://localhost:3000/home'
  SCOPE = "public_content"

  def self.get_url()

    Instagram.configure do |config|
      config.client_id = "7558aa55fdb94c549b6b0802ad8d656a"
      config.client_secret = "91c74642882b418f9d1a15699f536ac5"
    end

    url = Instagram.authorize_url(:redirect_uri => CALLBACK_URL, :scope => SCOPE)
    URI.decode url
  end

  def self.save_token(code)
    response = Instagram.get_access_token(code, :redirect_uri => CALLBACK_URL)
    response.access_token    
  end


  def self.load_header(usuarios, access_token)

    client = Instagram.client(:access_token => access_token)

    html1 = "<div class='row'><div class='col-md-12'>"

    usuarios.each do |usu| 
      for user in client.user_search(usu[1])
        html1 += "<div class='usu-name'> #{user.username}<br><img src='#{user.profile_picture}' height='100px'></div>"
      end
    end 
    html1 += "</div></div>"
    
  end

end