class AddAncestryToCategory < ActiveRecord::Migration[5.2]
  def change
    add_column :categories, :ancestry, :string, null: true
    add_index  :categories, :ancestry
  end
end
