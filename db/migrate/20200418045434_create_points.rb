class CreatePoints < ActiveRecord::Migration[5.2]
  def change
    create_table :points do |t|
      t.references :user ,null: false
      t.string :point ,null: false

      t.timestamps
    end
  end
end
