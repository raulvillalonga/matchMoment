class EditReference < ActiveRecord::Migration
  def change
    remove_column :media, :id_user
    add_reference :media, :user, index:true
  end
end
