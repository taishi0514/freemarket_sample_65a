class CreateAreas < ActiveRecord::Migration[5.2]
  def change
    create_table :areas do |t|
      t.string  :name,null: false
      t.timestamps
    end
    add_index :areas, :name
  end
end
