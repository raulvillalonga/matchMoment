class CreateMedia < ActiveRecord::Migration
  def change
    create_table :media do |t|
      
      t.integer  :id_user
      t.string   :id_medium_ins
      t.datetime :created_time
      t.string   :link
      t.string   :low_resolution
      t.string   :mediu_resolution
      t.string   :high_resolution
      t.float    :latitude
      t.float    :longitude
      t.string   :name_location
      t.string   :id_location

      t.timestamps null: false
    end
  end
end
