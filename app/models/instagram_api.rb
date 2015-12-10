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

  def self.load_header_users(usuarios, access_token)
    client = Instagram.client(:access_token => access_token)
    hash_usuarios = []

    usuarios.each do |usu| 
      photo_insta = nil
      for user in client.user_search(usu[1])
        if user.username == usu[1]
          photo_insta = user.profile_picture
        end  
      end
      hash_usuarios << { usuario: usu[1], photo: photo_insta }          
    end 
    return hash_usuarios
  end


end