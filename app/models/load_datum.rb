class LoadDatum 

  def self.get_header_data_users(users, session)
    hash_usuarios = []
    users.each do |usu|
      if ((check_user_is_saved?(usu[1])) && (check_user_updated?(usu[1], session)))
        hash_usuarios << load_user(usu[1])
      else
        if InstagramApi.user_exists?(usu[1], session)
          save_user(usu[1],session)
          hash_usuarios << load_user(usu[1])
        else
          hash_usuarios << {id_instagram: nil, 
                            username: usu[1]}
        end
      end
    end    
    return hash_usuarios
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
    if ((userData != nil) && (userApi.length != 0))
      userData.profilepicture == userApi.profile_picture      
    else
      return false
    end
  end

  def self.save_user(user, session)
    if (InstagramApi.user_exists?(user, session))
      user_data = InstagramApi.get_user(user, session)
      User.create({id_instagram: user_data.id, 
                  username: user_data.username, 
                  fullname: user_data.full_name, 
                  website: "https://www.instagram.com/" + user_data.username + "/", 
                  profilepicture: user_data.profile_picture})           
    end
  end

  def self.save_media(users, session)
    users.each do |usu|    
      if (usu[:id_instagram] != nil)
        if (InstagramApi.last_media(usu[:username], session) != last_media_saved(usu[:username]))
          save_media_data(usu[:username], last_media_saved(usu[:username]), session)
        end
      end
    end
  end

  def self.last_media_saved(user)
    userData = User.where(username: user)
    medium = userData[0].media.last

    if (medium == nil)
      return '0'
    else
      medium[:id_medium_ins]
    end
  end

  def self.save_media_data(user, last_id, session)
    arr_media = InstagramApi.get_media_by_user(user, last_id, session)     
    arr_media.each do |medium|
      save_medium(user, medium)
    end
  end

  def self.save_medium(user, medium)
    userData = User.where(username: user)
    if (medium[:location] == nil)
      lo_la = nil
      lo_lo = nil
      lo_na = nil
      lo_id = nil      
    else
      lo_la = medium[:location][:latitude].to_f
      lo_lo = medium[:location][:longitude].to_f
      lo_na = medium[:location][:name]
      lo_id = medium[:location][:id]
    end

    userData[0].media.create(id_medium_ins: medium[:id], 
                             created_time: Time.at(medium[:created_time].to_i), 
                             link: medium[:link], 
                             low_resolution: medium[:images][:low_resolution][:url], 
                             mediu_resolution: medium[:images][:thumbnail][:url], 
                             high_resolution: medium[:images][:standard_resolution][:url], 
                             latitude: lo_la, 
                             longitude: lo_lo, 
                             name_location: lo_na, 
                             id_location: lo_id)    
  end
  
end