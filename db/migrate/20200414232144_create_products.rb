class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.references :user  ,null: false
      t.references :trade ,null: false
      t.string  :title  ,null: false
      t.references  :size ,null: false
      t.string  :shipping_id	,null: false
      t.timestamp :ship_period  ,null: false
      t.string  :ship_method  ,null: false
      t.string  :ship_area  ,null: false
      t.string  :price  ,null: false
      t.string  :likes_count	,null: false
      t.string  :detail ,null: false
      t.string  :condition  ,null: false
      t.references  :category ,null: false
      t.references  :brand  ,null: false
      t.timestamps
    end
  end
end
