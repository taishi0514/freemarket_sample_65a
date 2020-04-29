class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.references :user  
      t.string  :title  
      t.string  :detail 
      t.string  :category 
      t.string  :brand  
      t.string  :condition  
      t.string  :ship_fee	
      t.string  :ship_area  
      t.string :ship_period  
      t.string  :price  
      t.timestamps
    end
  end
end
