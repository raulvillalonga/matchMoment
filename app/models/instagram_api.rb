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


  def self.user_exists?(username, access_token)
    client = Instagram.client(:access_token => access_token)
    data = client.user_search(username)
    if (data.length == 0)
      return false
    else
      username == data[0].username
    end
  end

  def self.get_user(username, access_token)
    client = Instagram.client(:access_token => access_token)
    data = client.user_search(username)
    data[0]    
  end

  def self.last_media(username, access_token)
    client = Instagram.client(:access_token => access_token)
    data = client.user_search(username)
    ultima = client.user_recent_media(data[0].id, count: 1)
    ultima[0].id    
  end

  def self.get_media_by_user(username, last_id, access_token)
    arr_media = []
    ini_id = 0
    abandonar = false

    client = Instagram.client(:access_token => access_token)
    data = client.user_search(username)

    while (abandonar == false)
      if (ini_id == 0)
        media = client.user_recent_media(data[0].id, {count: 10})      
      else      
        media = client.user_recent_media(data[0].id, {count: 10, :max_id => ini_id})
      end
      if (media.length == 0)
        abandonar = true
      else
        media.each do |medium|
          if ((medium.id != last_id)||(abandonar == false))
            arr_media << medium
            ini_id = medium.id
          else
            abandonar = true
          end
        end
      end
    end
    arr_media.reverse
  end

end