class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.references :trade ,null: false
      t.references :reviewer ,null: false
      t.references :reviewed ,null: false
      t.string :review ,null: false
      t.string :rate ,null: false

      t.timestamps
    end
  end
end
