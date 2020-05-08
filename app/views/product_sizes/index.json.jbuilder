# サイズの情報を表示
json.array! @product_sizes do |product_size|
  json.id product_size.id
  json.name product_size.name
end