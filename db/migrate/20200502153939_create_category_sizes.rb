class CreateCategorySizes < ActiveRecord::Migration[5.2]
  def change
    create_table :category_sizes do |t|
      # references
      t.references :category,           null: false, foreign_key: true
      t.references :product_size,       null: false, foreign_key: true

      t.timestamps
    end
  end
end
