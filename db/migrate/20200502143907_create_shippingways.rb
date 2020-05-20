class CreateShippingways < ActiveRecord::Migration[5.2]
  def change
    create_table :shippingways do |t|
      # values
      t.string     :name,         null: false

      t.timestamps
    end
    add_index :shippingways, :name
  end
end
