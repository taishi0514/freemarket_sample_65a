class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|

      t.string :family_name_kanji,  null: false
      t.string :last_name_kanji,    null: false
      t.string :family_name_kana,   null: false
      t.string :last_name_kana,     null: false
      t.string :zipcode
      t.text :prefecture_name,      null: false
      t.text :cities_name,          null: false
      t.text :address,              null: false
      t.text :building_name
      t.text :tell_num
      t.references :user
      t.timestamps
    end
  end
end