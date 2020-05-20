class CreateProductSizes < ActiveRecord::Migration[5.2]
  def change
    create_table :product_sizes do |t|
      # values
      t.string :name,    null: false

      t.timestamps
    end
    add_index :product_sizes, :name
  end
end