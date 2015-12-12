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

    @usuarios = InstagramApi.load_header_users(params[:usuarios], session[:access_token])

    #BUSCAR USUARIO: ESTA EN BASE DE DATOS SINO BUSCAR DE INTERNET
    #CARGAR FOTOS DEL PRIMER USUARIO
    #COMPARA LA PRIMERA CON LOS OTROS USUARIOS
    #GUARDAR CONCIDENCIA# SI HAY COINCIDENCIAS EN ARRAY
    

    puts esta_cerca([46.3625, 15.114444],[46.055556, 14.508333], 500000)
    
    render 'match'
  end

  def userData
    data = User.find_by_id(params[:id])
    render status:200,json:data
  end

  def dataMedia

  end  
end
