class CreateTrades < ActiveRecord::Migration[5.2]
  def change
    create_table :trades do |t|
      t.references :vender ,null: false 
      t.references :product ,null: false 
      t.references :customer ,null: false 

      t.timestamps
    end
  end
end
