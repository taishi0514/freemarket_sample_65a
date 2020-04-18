class Products < ActiveRecord::Migration[5.2]
  def change
    remove_column :Products, :trade_id
    remove_column :Products, :title
    remove_column :Products, :size_id
    remove_column :Products, :shipping_id
    remove_column :Products, :ship_period
    remove_column :Products, :ship_method
    remove_column :Products, :ship_area
    remove_column :Products, :price
    remove_column :Products, :likes_count
    remove_column :Products, :detail
    remove_column :Products, :condition
    remove_column :Products, :category_id
    remove_column :Products, :brand_id

  end
end
