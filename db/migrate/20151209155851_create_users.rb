class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|

      t.string   :id_instagram
      t.string   :username
      t.string   :fullname
      t.string   :website
      t.string   :profilepicture

      t.timestamps null: false
    end
  end
end
