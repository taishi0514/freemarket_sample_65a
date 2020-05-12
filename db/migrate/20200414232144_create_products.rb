class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.references :user       
      t.string  :title              
      t.string  :detail             
      t.references :category       
      t.string  :brand             
      t.string  :condition          
      t.references  :shippingway	  
      t.references  :product_size	  
      t.references  :area  
      t.string :ship_period  
      t.integer :price
      t.timestamps
    end
  end
end
