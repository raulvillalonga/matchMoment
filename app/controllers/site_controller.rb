class SiteController < ApplicationController

  def home
    render 'home'
  end

  def match
    @usuarios = params[:usuarios]        
    render 'match'
  end

end
