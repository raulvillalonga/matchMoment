class LoadDatum 

  def self.get_header_data_users(users, session)
    hash_usuarios = []

    users.each do |usu|
      binding.pry
      if ((check_user_is_saved?(usu[1])) && (check_user_updated?(usu[1], session)))
        hash_usuarios << load_user(usu[1])
      else
        if InstagramApi.user_exists?(usu[1], session)
          save_user(usu[1],session)
          hash_usuarios << load_user(usu[1])
        else
          hash_usuarios << {id_instagram: nil, 
                            username: use[1]}
        end
      end
    end
    
    return hash_usuarios
    #usuarios = InstagramApi.load_header_users(users, session)    
  end


  def self.check_user_is_saved?(user)
    User.exists?(username: user)
  end


  def self.load_user(user)
    userData = User.where(username: user)  
    return userData[0]
  end

  def self.check_user_updated?(user, session)
    userData = load_user(user)
    userApi = InstagramApi.get_user(user, session)
    binding.pry
    if ((userData != nil) && (userApi.length != 0))
      userData.profilepicture == userApi.profile_picture      
    else
      return false
    end
  end

  def self.save_user(user, session)
    if (InstagramApi.user_exists?(user, session))
      user_data = InstagramApi.get_user(user, session)
      binding.pry
      User.create({id_instagram: user_data.id, 
                  username: user_data.username, 
                  fullname: user_data.full_name, 
                  website: "https://www.instagram.com/" + user_data.username + "/", 
                  profilepicture: user_data.profile_picture})           
    end
  end

end