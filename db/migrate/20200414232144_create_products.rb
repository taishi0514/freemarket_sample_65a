class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name
      t.integer :price
      t.references :category
      t.string  :brand
      t.string  :condition
      t.references  :shippingway
      t.references  :area  
      t.string :ship_period
      t.timestamps
    end
  end
end
