class CreateCredits < ActiveRecord::Migration[5.2]
  def change
    create_table :credits do |t|
      t.references :user ,null: false
      t.references :expiration_date ,null: false
      t.references :card_num ,null: false

      t.timestamps
    end
  end
end
