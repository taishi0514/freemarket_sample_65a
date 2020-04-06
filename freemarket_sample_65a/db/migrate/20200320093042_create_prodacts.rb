class CreateProdacts < ActiveRecord::Migration[5.2]
  def change
    create_table :prodacts do |t|
      
      t.timestamps
    end
  end
end
