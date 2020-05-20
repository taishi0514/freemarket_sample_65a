class AddAncestryToShippingways < ActiveRecord::Migration[5.2]
  def change
    add_column :shippingways, :ancestry, :string
    add_index :shippingways, :ancestry
  end
end
